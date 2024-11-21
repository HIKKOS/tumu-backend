export default class ProductModel {
    constructor(
       public name: string,
       public description: string,
       public price:string,
       public quantity: string,
  
            
    ) {}
    static fromBody (
        body : any    
    ) {
       const {name, 
            description,
            price,
            quantity } = body;
        const post = new ProductModel(
            name,
            description,
            price,
            quantity,
        );
        return post;
    }
}