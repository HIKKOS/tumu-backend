import { Decimal } from "@prisma/client/runtime/library";
import User from "./user";

export interface Ticket{
    folio:number;
    userId:number;
    total:Decimal;
    createAt:Date;
    status:boolean;
    user?:User | null;
    copyWith?(user: Ticket): Ticket;
}