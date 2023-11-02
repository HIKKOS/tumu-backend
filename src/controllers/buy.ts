import { Prisma, ProductTicket } from "@prisma/client";
import prisma from "../services/prisma_client";
import { Response, request } from "express";

class BuyController {

    static #instance : BuyController;

    private constructor(){}

    public static getInstance(): BuyController{
        if(!BuyController.#instance){
            BuyController.#instance= new BuyController();
        }

        return BuyController.#instance;
    }

    public async post(req:Request, res: Response):Promise<Response>{
        try {
            await prisma.$transaction(async (ts)=>{
                
                const { userId , products }= req.body;

                let precioTotal: number= 0;

                for(const product of products){
                    const {cantidad, price, productId}= product;

                    precioTotal+=cantidad*price;

                    await BuyController.#instance.discountAmount(productId, precioTotal,ts)
                }

                const newTicket = await ts.tickets.create({
                    data:{
                        userId:userId,
                        createdAt: new Date(),
                        status:true,
                        products: products.map((product:ProductTicket) => {
                            productId: product.productId,
                            
                        })
                    }
                })
            })
        } catch (error:any) {
            
        }
    }

    public async discountAmount(productId: number, cantidad: number, ts: Prisma.TransactionClient){

    }


}

export default BuyController.getInstance();