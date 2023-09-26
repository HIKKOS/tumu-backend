import { Request } from "express";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_req, file, cb) => {
    const datetimestamp = Date.now();
    const name =
      file.fieldname +
      "-" +
      datetimestamp +
      "." +
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, name);
  },
});
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const validateFields = ["png", "jpg", "jpeg", "gif"];
  if (!validateFields.includes(path.extname(file.originalname).split(".")[1])) {
    return cb(Error("Only images are allowed"));
  }
  cb(null, true);
};
export default multer({
  storage,
  fileFilter,
});
