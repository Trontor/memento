import {
  Injectable,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import { User } from "../user/dto/user.dto";
import { CreateMementoInput } from "./inputs/memento.inputs";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { MementoDocument } from "./schema/memento.schema";
import { fromHexStringToObjectId } from "../common/mongo.util";
import { FileService } from "../file/file.service";
import { MediaType, Media } from "./dto/media.dto";
import { InvalidMediaTypeException } from "./memento.exceptions";
import { CreateMediaInput } from "./inputs/media.inputs";
import { mapDocumentToMementoDTO } from "./schema/memento.mapper";
import { Memento } from "./dto/memento.dto";
import { validateMementoInput } from "./memento.util";

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
    const { media, familyId, ...data } = input;

    // validate date
    validateMementoInput(input);

    const uploadedBy: Types.ObjectId = fromHexStringToObjectId(uploader.userId);
    const inFamily: Types.ObjectId = fromHexStringToObjectId(input.familyId);

    let mediaForDoc: Media[] | undefined = undefined;
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
      doc.media = mediaForDoc;
    }

    // insert document
    try {
      doc = await doc.save();
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException("Could not save Memento");
    }
    return mapDocumentToMementoDTO(doc);
  }

  /**
   * Converts user input of media into database document,
   * by extracting file, uploading it, and making a `Media[]`,
   * where each `Media` contains the URL to the successfully
   * uploaded file.
   *
   * @param media array of input media
   */
  private async convertMediaInputForDocument(
    media: CreateMediaInput[],
  ): Promise<Media[]> {
    let mediaUrls: any[];
    // upload media separately
    try {
      mediaUrls = await this.uploadMedia(media);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    // create media document objects with the uploaded URLs
    const mediaForDocument: Media[] = mediaUrls.map((url, index) => {
      // get original media item
      const item: CreateMediaInput = media[index];
      const data: Media = {
        url,
        type: item.type,
      };
      if (item.caption) data.caption = item.caption;
      return data;
    });
    return mediaForDocument;
  }

  /**
   * Uploads media and returns an array of URLs.
   *
   * @param media array of input for uploading memento media
   */
  private async uploadMedia(media: CreateMediaInput[]) {
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
