import { Request, Response } from "express";
import IController from "../interfaces/controller";
import prisma from "../services/prisma_client";
import { Product } from "../@types/product";


const select = {
  id: true,
  productName: true,
  price: true,
  stock: true,
  categoryId: true,
  description: true,
  image: true,
  status: true,
  category: true,
};

class ProductController implements IController {
  static #instance: ProductController;
  private constructor() {}

  public static getInstance(): ProductController {
    if (!ProductController.#instance) {
      ProductController.#instance = new ProductController();
    }
    return ProductController.#instance;
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { limit = "5", page = "1" } = req.query;

    try {
      const products:Product[]  = await prisma.products.findMany({
        where: { status: true },
        skip: Number(page) - 1,
        take: Number(limit),
        select,
      });
      const count: number = await prisma.products.count({
        where: { status: true },
      });

      return res.json({ count, products });
    } catch (error: any) {
      return res.status(500).json({ code: 500, msg: error });
    }
  }

  public async get(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);

    const product: Product | null = await prisma.products.findUnique({
      where: {
        id: id,
      },
      select,
    });
    console.log(product);

    return res.json(product);
  }

  public async post(req: Request, res: Response): Promise<Response> {
    try {
      const { body } = req;
      const newProduct: Product = await prisma.products.create({
        data: {
          productName: body.productName,
          price: body.price,
          stock: body.stock,
          description: body.description,

          categoryId: body.categoryId,
          image: body.image,
        },
      });
      return res.json({
        msg: `Se creo el producto ${newProduct.productName} con id ${newProduct.id}`,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ code: 500, msg: error });
    }
  }

  public async put(req: Request, res: Response): Promise<Response> {
    try {
      const { params, body } = req;
      const oldProduct:Product | null = await prisma.products.findUnique({
        where: { id: parseInt(params.id) },
      });

      const newProduct = await prisma.products.update({
        where: {
          id: parseInt(params.id),
        },
        data: {
          productName: body.productName || oldProduct!.productName,
          price: body.price || oldProduct!.price,
          stock: body.stock || oldProduct!.stock,
          description: body.description || oldProduct!.description,
          status: body.status || oldProduct!.status,
          categoryId: body.categoryId || oldProduct!.categoryId,
          image: body.imageUrl || oldProduct!.image,
        },
      });

      return res.status(204).json({
        msg: `Se actualizo el producto con id${newProduct.id}`,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        msg: error,
      });
    }
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await prisma.products.update({
        where: { id: parseInt(id) },
        data: {
          status: false,
        },
      });
      return res.status(204).json({
        msg: `Se elimino produccto el usuario con id${id}`,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ code: 500, msg: error });
    }
  }
}

export default ProductController.getInstance();
