import { Request, Response } from "express";
import prisma from "../services/prisma_client";
import IController from "../interfaces/controller";

import ProductModel from "../models/Product";
 
import FileSystemManager from "../utils/fileSystem";
import ProductFS from "../utils/productsFS";
export class ProductController implements IController {
  private fileSystemManager: FileSystemManager<ProductModel>;
  constructor() {
    this.fileSystemManager = new ProductFS();
  }

  public async post(req: Request, res: Response): Promise<Response> {
    try {
      const newPost = ProductModel.fromBody(req.body);
      await prisma.products.create({
        data: {
          name: newPost.name,
          description: newPost.description,
          price: Number(newPost.price) ,
          stock: Number(newPost.quantity),
        }
      })
      return res.json(newPost);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ code: 500, msg: error });
    }
  }
  public async get(_req: Request, res: Response): Promise<Response> {
    try {
/*       const { id } = req.params;
    */
      return res.json({});
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ code: 500, msg: error });
    }
  }
  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.fileSystemManager.getAllEntities();
      return res.json(products);
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
