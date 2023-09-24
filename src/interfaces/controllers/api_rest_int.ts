import { Request, Response } from "express";

export default interface IController {
  readAll: (req: Request, res: Response) => Promise<any>;
  create: (req: Request, res: Response) => Promise<any>;
  read: (req: Request, res: Response) => Promise<any>;
  update: (req: Request, res: Response) => Promise<any>;
  delete: (req: Request, res: Response) => Promise<any>;
}
