/**
 * Returns whether the mimetype is an accepted image.
 */
export const isImage = (mimetype: string) => {
  if (!mimetype || mimetype.trim() === "") return false;
  if (!mimetype.startsWith("image/")) return false;
  const split = mimetype.split("/");
  if (split.length !== 2) return false;
  const imageType: string = split[1];
  switch (imageType) {
    // Allowed image formats
    case "jpg":
    case "jpeg":
    case "png":
      return true;
    default:
      return false;
  }
};

/**
 * Returns whether the mimetype is an accepted video.
 */
export const isVideo = (mimetype: string) => {
  if (!mimetype || mimetype.trim() === "") return false;
  if (!mimetype.startsWith("video/")) return false;
  const split = mimetype.split("/");
  if (split.length !== 2) return false;
  const videoType: string = split[1];
  switch (videoType) {
    // Allowed video formats
    case "mp4":
      return true;
    default:
      return false;
  }
};
