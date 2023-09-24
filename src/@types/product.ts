import { Category } from "./category";

export interface Product {
  id: number;
  productName: string;
  price: number;
  stock: number;
  categoryId: number;
  description: string;
  image: string;
  status: boolean;
  category: Category;
}
