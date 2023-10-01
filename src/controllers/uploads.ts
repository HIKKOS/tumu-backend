import { Request, Response } from "express";
import multer from "../services/multer";

export const createPhoto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productUpload = multer.single("product-image");
  productUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "invalid file" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "no file" });
    }
    return res.json({ message: "Photo created2" });
  });
};
export const getPhoto = async (req: Request, res: Response): Promise<void> => {
  const productUpload = multer.single("product-image");
  productUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "invalid file" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "no file" });
    }
    return res.json({ message: "Photo created2" });
  });
};
