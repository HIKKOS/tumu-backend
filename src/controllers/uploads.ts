import { Request, Response } from "express";

export const createPhoto = async (_req: Request, res: Response) => {
  return res.json({ message: "Photo created" });
};
