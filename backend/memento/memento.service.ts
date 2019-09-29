import {
  Injectable,
  Logger,
  InternalServerErrorException,
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
} from "./memento.util";

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
  ) {}

  async findById(mementoId: string): Promise<MementoDocument> {
    const doc = await this.MementoModel.findById(mementoId);
    if (!doc) throw new MementoNotFoundException();
    return doc;
  }

  async updateMemento(input: UpdateMementoInput): Promise<Memento> {
    // validate fields
    validateUpdateMementoInput(input);

    const { mementoId, updateMedia, appendMedia, deleteMedia, ...rest } = input;

    const updateObj: IUpdateMementoPayload = { $set: {} };
    const updateOptions: IUpdateMementoOptions = { new: true };

    // update memento top-level properties
    if (rest.location) updateObj.$set.location = input.location;
    if (rest.description) updateObj.$set.description = input.description;
    if (rest.tags) updateObj.$set.tags = input.tags;

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
    if (lastId) conditions._id = { $gt: fromHexStringToObjectId(lastId) };
    // filter Mementos by tags
    if (tags) conditions.tags = { $in: tags };
    const docs = await this.MementoModel.find(conditions).limit(pageSize);
    return docs;
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
    const { media, dates, familyId, ...data } = input;

    // validate date
    validateMementoInput(input);

    const uploadedBy: Types.ObjectId = fromHexStringToObjectId(uploader.userId);
    const inFamily: Types.ObjectId = fromHexStringToObjectId(input.familyId);

    let mediaForDoc = undefined;
    if (media) {
      mediaForDoc = await this.convertMediaInputForDocument(media);
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

    // insert document
    try {
      doc = await doc.save();
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException("Could not save Memento");
    }
    return doc.toDTO();
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
    let mediaUrls: any[];
    // upload media separately
    try {
      mediaUrls = await this.uploadMedia(media);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    // create media document objects with the uploaded URLs
    const mediaForDocument = mediaUrls.map((url, index) => {
      // get original media item
      const item: CreateMementoMediaInput = media[index];
      const data = {
        url,
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
  private async uploadMedia(media: CreateMementoMediaInput[]) {
    const urlPromises: Promise<any>[] = media.map(m => {
      let promise: Promise<string>;
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
