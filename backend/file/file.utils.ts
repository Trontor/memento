export const isImage = (mimetype: string) => {
  if (!mimetype || mimetype.trim() === "") return false;
  if (!mimetype.startsWith("image/")) return false;
  const split = mimetype.split("/");
  if (split.length !== 2) return false;
  const [_, imageType] = split;
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

export const isVideo = (mimetype: string) => {
  if (!mimetype || mimetype.trim() === "") return false;
  if (!mimetype.startsWith("video/")) return false;
  const split = mimetype.split("/");
  if (split.length !== 2) return false;
  const [_, videoType] = split;
  switch (videoType) {
    // Allowed video formats
    case "mp4":
      return true;
    default:
      return false;
  }
};
