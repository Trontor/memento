/**
 * Interface for an uploaded file in S3.
 */
export interface IUploadedFile {
  // full URL with CDN prefix
  url: string;
  // S3 key
  key: string;
}
