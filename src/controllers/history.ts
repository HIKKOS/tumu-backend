import { Request, Response } from "express";
import prisma from "../services/prisma_client";
import { ProductTicket } from "@prisma/client";

const select = {
    id:false,
    productId: true,
    productName: true,
    amount:true,
    price:true,
    images: true,
    ticketsFolio: true
}


class HistoryController {
    static #instance : HistoryController;

    private constructor(){};

    public static getInstance(): HistoryController { 
        if(!HistoryController.#instance){
            HistoryController.#instance =  new HistoryController();
        }
        return HistoryController.#instance;
    }

    public async getAll(req:Request, res: Response): Promise<Response> {
        const {limit = "10", page = "1"} = req.query;

        try {
            const history: ProductTicket[] =  await prisma.productTicket.findMany({
                skip: Number(page)-1,
                take: Number(limit),
                select
            });

            const count : number = await prisma.productTicket.count();

            return res.status(200).json({count, history})
        } catch (error:any) {
            return res.status(500).json({code: 500, msg: error.message})
        }

    }

}


export default HistoryController.getInstance();