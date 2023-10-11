import { Request } from "express";
import multer from "multer";
import path from "path";
export default class MulterHandler {
  static #instance: multer.Multer | undefined;
  static #destination = path.join("src/uploads");
  static #fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ): void => {
    const validateFields = ["png", "jpg", "jpeg", "gif"];
    if (
      !validateFields.includes(path.extname(file.originalname).split(".")[1])
    ) {
      return cb(Error("Only images are allowed"));
    }
    cb(null, true);
  };
  private constructor() {}
  public static getInstace(): multer.Multer {
    if (!this.#instance) {
      this.#instance = multer({
        storage: multer.diskStorage({
          destination: this.#destination,
          filename: (_req, file, cb) => {
            cb(null, this.buildFileName(file));
          },
        }),
        fileFilter: this.#fileFilter,
      });
    }
    return this.#instance;
  }
  private static buildFileName(file: Express.Multer.File): string {
    const datetimestamp = Date.now();
    const name =
      file.fieldname +
      "-" +
      datetimestamp +
      "." +
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    return name;
  }
  private static upload(itemId: number, folderName: string): multer.Multer {
    return multer({
      storage: multer.diskStorage({
        destination: path.join(
          this.#destination,
          folderName,
          itemId.toString()
        ),
        filename: (_req, file, cb) => {
          cb(null, `${this.buildFileName(file)}`);
        },
      }),
      fileFilter: this.#fileFilter,
    });
  }
  public static single(field: string, folderName: string, itemId: number) {
    return this.upload(itemId, folderName).single(field);
  }
}
