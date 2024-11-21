import ProductModel from "../models/Product";
import FileSystemManager from "./fileSystem";
import * as fs from 'fs';
export default class ProductFS extends FileSystemManager<ProductModel> {
    constructor() {
        super('products');
        
    }
    createFolder() {
        try {
            if (!fs.existsSync(this.fullPath)){
                console.log(this.fullPath);
           
                fs.appendFileSync(`${this.fullPath}\\data.json`, '');
            }
        } catch (error) {
            console.log('Folder already exists');
        }
    }


    convertToString(entity: ProductModel): string {
        return JSON.stringify(entity);
    }
    convertToEntity(data: string): ProductModel {
        const { name, description, price, quantity } = JSON.parse(data);
        return new ProductModel(name, description, price, quantity);
    }
     
}