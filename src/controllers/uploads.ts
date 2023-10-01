import { Request, Response } from "express";
import multer from "../services/multer";

export const createPhoto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productUpload = multer.single("product-image");
  productUpload(req, res, (err) => {
    if (err) {
      return res.send({ error: "invalid file" });
    }
    if (!req.file) {
      return res.send({ error: "no file" });
    }
    return res.json({ message: "Photo created2" });
  });
};
