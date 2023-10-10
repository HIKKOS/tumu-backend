import { Decimal } from "@prisma/client/runtime/library";


export interface ProductsTicket{
    productId:number;
    productName:string;
    price:Decimal;
}