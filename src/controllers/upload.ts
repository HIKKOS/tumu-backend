import { Request, Response } from "express";
import path from "path";
import prisma from "../services/prisma_client";
import IController from "../interfaces/controller";

export class PostController implements IController {
  public async post(req: Request, res: Response): Promise<Response> {
    const files = req.files;
    /*     console.log({ body: req.body });
    console.log("--------------------");
    console.log({ req }); */
    try {
      if (!files) {
        return res
          .status(400)
          .json({ code: 400, msg: "No files were uploaded." });
      } else {
        const photo = files.imageFile as any;
        //save photo to upload folder
        //save photo to upload folder

        await photo.mv(
          path.join(__dirname, "../uploads/", Date.now().toString() + ".jpg")
        );

        console.log(photo);
        return res.json({ msg: "File uploaded!" });
      }
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ code: 500, msg: error });
    }
  }
  public async get(_: Request, res: Response): Promise<Response> {
    return res.json({ msg: "get" });
  }
  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const posts = await prisma.post.findMany();
      return res.json(posts);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ code: 500, msg: error });
    }
  }
  public async put(_req: Request, res: Response): Promise<Response> {
    return res.json({ msg: "put" });
  }
  public async delete(_req: Request, res: Response): Promise<Response> {
    return res.json({ msg: "delete" });
    /*  try {
      const { id } = req.params;
      await prisma.post.delete({
        where: { id: parseInt(id) },
      });
      return res.json({ msg: "Post eliminado" });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ code: 500, msg: error });
    } */
  }
}
