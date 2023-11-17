import { Prisma } from "@prisma/client";
import prisma from "../services/prisma_client";
import { Response, Request } from "express";

class BuyController {
  static #instance: BuyController;

  constructor() {}

  public static getInstance(): BuyController {
    if (!BuyController.#instance) {
      BuyController.#instance = new BuyController();
    }

    return BuyController.#instance;
  }

  public async post(req: Request, res: Response): Promise<Response> {
    try {
      await prisma.$transaction(async (ts) => {
        const { userId, products } = req.body;

        let precioTotal: number = 0;
        let amountTotal: number = 0;

        const productData = [];

        for (const product of products) {
          const { amount, price, productId } = product;

          const image = await ts.imagesPaths.findFirst({
            where: {
              productoId: productId,
              status: true,
            },
          });

          const imagePath = image?.path ? image.path : null;

          precioTotal += amount * price;
          amountTotal += amount;

          await BuyController.getInstance().discountAmount(
            productId,
            amount,
            ts
          );

          productData.push({
            productId: productId,
            productName: product.productName,
            amount: amount,
            price: price,
            images: imagePath,
          });
        }

        await ts.tickets.create({
          data: {
            userId: userId,
            createdAt: new Date(),
            status: true,
            products: {
              createMany: {
                data: productData,
              },
            },
            amountProducts: amountTotal,
            total: precioTotal,
          },
        });
      });
      return res.status(200).json({
        code: 200,
        msg: "Solicitud procesada correctamente.",
      });
    } catch (error: any) {
      return res.status(400).json({
        code: 400,
        msg: error.message || "Ha ocurrido un error interno.",
      });
    }
  }

  public async discountAmount(
    productId: number,
    cantidad: number,
    ts: Prisma.TransactionClient
  ) {
    try {
      const product = await ts.products.findUnique({
        where: {
          id: productId,
        },
      });
      const { stock } = product!;
      console.log(stock);
      const newStock: number = stock - cantidad;
      console.log(newStock);
      await ts.products.update({
        where: {
          id: productId,
        },
        data: {
          stock: newStock,
        },
      });
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
}

export default BuyController.getInstance();
