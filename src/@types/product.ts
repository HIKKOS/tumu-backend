import { Decimal } from "@prisma/client/runtime/library";
import  Category  from "./category";

export interface Product {
  id: number;
  productName: string;
  price: Decimal;
  stock: number;
  categoryId: number;
  description: string|null;
  image: string[];
  status: boolean;
  category?: Category|null;
}
