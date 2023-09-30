import { Request,Response } from "express";
import IController from "../interfaces/controller";
import prisma from "../services/prisma_client";
import { Ticket } from "../@types/ticket";

const select  = {
    folio:true,
    userId:true,
    total:true,
    createAt:true,
    status:true,
    user:true,
}

class TicketController implements IController{
    static #intance: TicketController;

    /**
     *
     */
    constructor() {
    }

    public static getInstance(): TicketController{
        if(!TicketController.#intance){
            TicketController.#intance= new TicketController();
        }

        return TicketController.#intance;
    }

    public async getAll (req:Request,res:Response): Promise<Response>{
        const  {limit = "5", page="1"}=req.query

        try {
            const ticket:Ticket[]  =await prisma.tickets.findMany({
                where:{status:true},
                skip:Number(page)-1,
                take:Number(limit),
                select
            });

            const count : number= await prisma.tickets.count({
                where:{status:true},
            });

            return res.json({count,ticket})
        } catch (error) {
            return res.status(500).json({code:500,msg:error})
        }
    }

    public async get(req:Request,res:Response):Promise<Response>{
        const id=parseInt(req.params.id);

        const ticket = await prisma.tickets.findUnique({
            where:{
                folio:id
            },
            select
        })

        return res.json(ticket);
    }

    
}
