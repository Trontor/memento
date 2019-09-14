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
