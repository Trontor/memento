import { IUploadedFile } from "../file/file.interface";

/**
 * Media object ready for insertion into DB.
 */
export interface IMediaForInsert extends IUploadedFile {
  type: string;
  caption?: string;
}
