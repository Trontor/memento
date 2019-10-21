import {
  Injectable,
  Logger,
  InternalServerErrorException,
  forwardRef,
  Inject,
  BadRequestException,
} from "@nestjs/common";
import { User } from "../user/dto/user.dto";
import {
  CreateMementoInput,
  UpdateMementoInput,
} from "./inputs/memento.inputs";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  MementoDocument,
  IFindMementoConditions,
  IUpdateMementoPayload,
  IUpdateMementoOptions,
} from "./schema/memento.schema";
import { fromHexStringToObjectId } from "../common/mongo.util";
import { FileService } from "../file/file.service";
import { MediaType } from "./dto/media.dto";
import {
  InvalidMediaTypeException,
  MementoNotFoundException,
} from "./memento.exceptions";
import {
  CreateMementoMediaInput,
  UpdateMementoMediaInput,
  DeleteMementoMediaInput,
} from "./inputs/media.inputs";
import { Memento } from "./dto/memento.dto";
import {
  validateMementoInput,
  validateUpdateMementoInput,
  uniqueValues,
  preprocessTags,
} from "./memento.util";
import { VisionService, IDetectionResults } from "../vision/vision.service";
import { IUploadedFile } from "../file/file.interface";
import { IMediaForInsert } from "./memento.interface";
import { UserService } from "../user/user.service";
import { UserDocument } from "../user/schema/user.schema";
import { isUserInFamily } from "../user/user.util";
import { DetectionLabel } from "./dto/label.dto";

/**
 * Manages CRUD for Mementos.
 */
@Injectable()
export class MementoService {
  private readonly logger = new Logger(MementoService.name);

  constructor(
    @InjectModel("Memento")
    private readonly MementoModel: Model<MementoDocument>,
    private readonly fileService: FileService,
    private readonly visionService: VisionService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async findById(mementoId: string): Promise<MementoDocument> {
    const doc = await this.MementoModel.findById(mementoId);
    if (!doc) throw new MementoNotFoundException();
    return doc;
  }

  /**
   * Creates a bookmark by storing a reference to the bookmarker (User)
   * on the Memento, and a reference to the Memento on the bookmarker (User).
   *
   * @param user user who is bookmarking the Memento
   * @param mementoId id of the Memento being bookmarked
   */
  async createBookmark(user: User, mementoId: string) {
    // TODO: use mongodb sessions for causal consistency
    // add Memento ref to user
    const userDoc: UserDocument = await this.userService.addBookmarkToUser(
      user.userId,
      mementoId,
    );

    // add user ref to Memento
    const memento = await this.MementoModel.findByIdAndUpdate(
      fromHexStringToObjectId(mementoId),
      {
        $addToSet: {
          _bookmarkedBy: fromHexStringToObjectId(user.userId),
        },
      },
      { new: true },
    );
    if (!memento)
      throw new InternalServerErrorException(
        "Could not add bookmark to memento",
      );
    return { memento, user: userDoc };
  }

  /**
   * Deletes a bookmark removing the references on the user and memento.
   *
   * @param user user who is bookmarking the Memento
   * @param mementoId id of the Memento being bookmarked
   */
  async deleteBookmark(user: User, mementoId: string) {
    // TODO: use mongodb sessions for causal consistency
    // delete Memento ref from user
    const userDoc: UserDocument = await this.userService.deleteBookmarkFromUser(
      user.userId,
      mementoId,
    );

    // delete user ref from Memento
    const memento = await this.MementoModel.findByIdAndUpdate(
      fromHexStringToObjectId(mementoId),
      {
        $pull: {
          _bookmarkedBy: fromHexStringToObjectId(user.userId),
        },
      },
      { new: true },
    );
    if (!memento)
      throw new InternalServerErrorException(
        "Could not add bookmark to memento",
      );
    return { memento, user: userDoc };
  }

  async updateMemento(input: UpdateMementoInput): Promise<Memento> {
    // validate fields
    validateUpdateMementoInput(input);

    const {
      mementoId,
      updateMedia,
      appendMedia,
      deleteMedia,
      beneficiaries,
      people,
      ...rest
    } = input;

    // retrieve existing memento to get the familyId
    const memento = await this.MementoModel.findById(mementoId);
    if (!memento) throw new MementoNotFoundException();
    const { _beneficiaries, _people } = await this.processUserIdArrays(
      beneficiaries,
      people,
      memento.inFamily.toHexString(),
    );

    const updateObj: IUpdateMementoPayload = { $set: {} };
    const updateOptions: IUpdateMementoOptions = { new: true };

    // update memento top-level properties
    if (rest.location) updateObj.$set.location = rest.location;
    if (rest.description) updateObj.$set.description = rest.description;
    if (rest.tags) updateObj.$set.tags = preprocessTags(rest.tags);
    if (_beneficiaries) updateObj.$set._beneficiaries = _beneficiaries;
    if (_people) updateObj.$set._people = _people;

    // update nested _media property
    await this.addMediaUpdatesToPayload(
      updateObj,
      updateOptions,
      updateMedia,
      appendMedia,
      deleteMedia,
    );

    const doc = await this.MementoModel.findOneAndUpdate(
      { _id: mementoId },
      updateObj,
      updateOptions,
    );
    if (!doc) throw new InternalServerErrorException();
    return doc.toDTO();
  }

  /**
   * Helper function to construct update object for Mongoose
   * to update the memento.
   */
  private async addMediaUpdatesToPayload(
    updateObj: IUpdateMementoPayload,
    updateOptions: IUpdateMementoOptions,
    updateMedia?: UpdateMementoMediaInput[],
    appendMedia?: CreateMementoMediaInput[],
    deleteMedia?: DeleteMementoMediaInput[],
  ) {
    if (updateMedia) {
      // update existing media
      updateMedia.forEach((m, idx) => {
        // refer to this question:
        // https://stackoverflow.com/questions/49867541/bulk-update-array-of-matching-sub-document-in-mongodb

        // `o` is an arbitrary string. Any string beginning with
        // lowercase letter is allowed by MongoDB
        const key: string = `o${idx}`;

        // create the update payload for this single piece of media
        updateObj.$set[`_media.$[${key}].caption`] = m.caption;
        // choose the matching media sub-document to update, using `_id` field
        if (!updateOptions.arrayFilters) updateOptions.arrayFilters = [];
        updateOptions.arrayFilters.push({
          [`${key}._id`]: fromHexStringToObjectId(m.mediaId),
        });
      });
    }

    // create new media
    if (appendMedia) {
      const mediaForDoc = await this.convertMediaInputForDocument(appendMedia);
      if (!updateObj.$push) updateObj.$push = {};
      updateObj.$push._media = {
        $each: mediaForDoc,
      };
    }

    // delete existing media
    if (deleteMedia) {
      // TODO: delete media with FileService
      if (!updateObj.$pull) updateObj.$pull = {};
      updateObj.$pull._media = {
        _id: {
          $in: deleteMedia.map(d => fromHexStringToObjectId(d.mediaId)),
        },
      };
    }
  }

  /**
   * Fetches all Mementos belonging to a family.
   * @param familyId id of family
   * @param tags array of tags to filter by
   * @param lastId id of last Memento (for use in pagination)
   * @param pageSize maximum number of resolts to return in a single page
   */
  async getAllFamilyMementos(
    familyId: string,
    tags?: string[],
    lastId?: string,
    pageSize: number = 10,
  ): Promise<MementoDocument[]> {
    const conditions: IFindMementoConditions = {
      inFamily: fromHexStringToObjectId(familyId),
    };
    // return mementos after previous page of results
    if (lastId) conditions._id = { $lt: fromHexStringToObjectId(lastId) };
    // filter Mementos by tags - search in user tags and detected labels
    if (tags) {
      const _tags: string[] = preprocessTags(tags);
      conditions.$or = [
        {
          tags: { $in: _tags },
        },
        {
          "detectedLabels.name": { $in: _tags },
        },
      ];
    }
    const docs = await this.MementoModel.find(conditions)
      .sort({ $natural: -1 })
      .limit(pageSize);
    return docs;
  }

  /**
   * Fetches mementos of all families for a specific month.
   *
   * @param month current month as an integer
   * @param familyIds ids of families
   */
  async getAllMementosForMonth(
    month: number,
    familyIds: string[],
  ): Promise<Memento[]> {
    const docs: MementoDocument[] = await this.MementoModel.find({
      inFamily: {
        $in: familyIds.map(id => fromHexStringToObjectId(id)),
      },
      _dates: {
        $elemMatch: {
          month: { $eq: month },
        },
      },
    }).exec();
    return docs.map(doc => doc.toDTO());
  }

  /**
   * Creates a new Memento.
   *
   * @param uploader user who is uploading the Memento
   * @param input fields specifying new Memento
   */
  async createMemento(
    uploader: User,
    input: CreateMementoInput,
  ): Promise<Memento> {
    const {
      media,
      dates,
      familyId,
      beneficiaries,
      people,
      detectObjects,
      maxDetectedPerMedia,
      tags,
      ...data
    } = input;

    // validate date
    validateMementoInput(input);

    const uploadedBy: Types.ObjectId = fromHexStringToObjectId(uploader.userId);
    const inFamily: Types.ObjectId = fromHexStringToObjectId(input.familyId);

    const { _beneficiaries, _people } = await this.processUserIdArrays(
      beneficiaries,
      people,
      familyId,
    );

    // upload and prepare url for Memento media objects
    let mediaForDoc: IMediaForInsert[] | undefined = undefined;
    if (media) {
      mediaForDoc = await this.convertMediaInputForDocument(media);
    }

    let labels: DetectionLabel[] | undefined = undefined;
    if (detectObjects && mediaForDoc) {
      const results = await this.detectObjectsInMedia(
        mediaForDoc,
        maxDetectedPerMedia,
      );
      console.log(results);
      this.logger.debug(labels);
      labels = Array.from(results);
    }

    this.logger.log(
      `Creating memento for ${uploader.userId} in family ${input.familyId}`,
    );
    this.logger.debug(input);

    // populate document
    let doc = new this.MementoModel(data);
    doc.uploadedBy = uploadedBy;
    doc.inFamily = inFamily;
    if (mediaForDoc) {
      doc._media = mediaForDoc;
    }
    if (dates) doc._dates = dates;
    if (_beneficiaries) doc._beneficiaries = _beneficiaries;
    if (_people) doc._people = _people;
    if (labels && labels.length > 0) doc.detectedLabels = labels;
    if (tags) doc.tags = preprocessTags(tags);

    // insert document
    try {
      doc = await doc.save();
      await this.userService.addUpload(uploader, doc.id);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException("Could not save Memento");
    }
    return doc.toDTO();
  }

  private readonly MIN_CONFIDENCE = 80;
  private async detectObjectsInMedia(
    mediaForDoc: IMediaForInsert[],
    maxDetectedPerMedia: number,
  ): Promise<Set<IDetectionResults>> {
    this.logger.debug(mediaForDoc);
    // can only detect objects in image
    const promises = mediaForDoc
      .filter(m => m.type === MediaType.Image)
      .map(m =>
        this.visionService.detectObjects(
          m.key,
          maxDetectedPerMedia,
          this.MIN_CONFIDENCE,
        ),
      );
    const detectionResults: Set<IDetectionResults> =
      (await promises[0]) || new Set<IDetectionResults>();
    return detectionResults;
  }

  private async processUserIdArrays(
    beneficiaries: string[] | undefined,
    people: string[] | undefined,
    familyId: string,
  ) {
    const uniqueBeneficiaries = uniqueValues(beneficiaries);
    const uniquePeople = uniqueValues(people);

    // validate all users in `people` and `beneficiaries` exist and are in the family
    const allUserIds = uniqueValues(uniqueBeneficiaries.concat(uniquePeople));
    this.logger.debug(allUserIds);
    await this.validateUsersAreFamilyMembers(allUserIds, familyId);

    // convert hex strings to MongoDB ObjectId
    const _beneficiaries: Types.ObjectId[] | undefined = beneficiaries
      ? uniqueBeneficiaries.map(b => fromHexStringToObjectId(b))
      : undefined;
    const _people: Types.ObjectId[] | undefined = people
      ? uniquePeople.map(p => fromHexStringToObjectId(p))
      : undefined;
    return {
      _beneficiaries,
      _people,
    };
  }

  private async validateUsersAreFamilyMembers(
    userIds: string[],
    familyId: string,
  ) {
    if (userIds.length === 0) return;
    const users: User[] = await this.userService.getUsers(userIds);
    for (let user of users) {
      if (!isUserInFamily(user, familyId)) {
        throw new BadRequestException(
          `User ${user.userId} must be in the family ${familyId} to be added to a Memento.`,
        );
      }
    }
  }

  /**
   * Converts user input of media into database document,
   * by extracting file, uploading it, and making a `Media[]`,
   * where each `Media` contains the URL to the successfully
   * uploaded file.
   *
   * @param media array of input media
   */
  private async convertMediaInputForDocument(media: CreateMementoMediaInput[]) {
    let mediaFiles: IUploadedFile[];
    // upload media separately
    try {
      mediaFiles = await this.uploadMedia(media);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    // create media document objects with the uploaded URLs
    const mediaForDocument = mediaFiles.map(({ url, key }, index) => {
      // get original media item
      const item: CreateMementoMediaInput = media[index];
      const data = {
        url,
        key,
        type: item.type,
        caption: item.caption,
      };
      return data;
    });
    return mediaForDocument;
  }

  /**
   * Uploads media and returns an array of URLs.
   *
   * @param media array of input for uploading memento media
   */
  private async uploadMedia(
    media: CreateMementoMediaInput[],
  ): Promise<IUploadedFile[]> {
    const urlPromises: Promise<IUploadedFile>[] = media.map(m => {
      let promise: Promise<IUploadedFile>;
      if (m.type === MediaType.Image) {
        promise = this.fileService.uploadImage(m.file);
      } else if (m.type === MediaType.Video) {
        promise = this.fileService.uploadVideo(m.file);
      } else {
        throw new InvalidMediaTypeException();
      }
      return promise.catch(err => {
        this.logger.error(
          `While uploading array of media: ${JSON.stringify(err)}`,
        );
        throw err;
      });
    });
    return await Promise.all(urlPromises);
  }
}
