const validateFileUpload = (fileParameter: any): boolean => {
  const validExtentions = ["png", "jpg", "jpeg", "webp"];
  const { file } = fileParameter;
  if (file === undefined) {
    throw new Error("falta el parametro image");
  }
  if (!validExtentions.includes(file.mimetype.split("/")[1])) {
    throw new Error("el tipo de archivo no es permitido");
  } else {
    return true;
  }
};
export default validateFileUpload;
