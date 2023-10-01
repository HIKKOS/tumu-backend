import express from "express";
import cors from "cors";
import "dotenv/config";
export default class Server {
  #app: express.Application;
  #port: string | undefined;
  #paths = {
    users: "/api/users",
    categories: "/api/categories",
    products: "/api/products",
    tickets: "/api/ticket",
    auth: "/api/login",
    uploads: "/api/uploads",
  };
  constructor() {
    this.#app = express();
    this.#app.use(express.json());
    this.#port = process.env.PORT;
    //Middlewares
    this.middlewares();
    //rutas de mi apliacion
    this.routes();
    //conectar a la base de datos
    //this.conectarDb()
  }

  middlewares() {
    //directorio publico
    this.#app.use(express.static("public"));
    //cors
    this.#app.use(cors());
    //lectura y parse del body
    this.#app.use(express.json());
  }
  routes() {
    this.#app.use(this.#paths.auth, require("../routes/auth"));
    this.#app.use(this.#paths.categories, require("../routes/categories"));
    this.#app.use(this.#paths.products, require("../routes/products"));
    this.#app.use(this.#paths.tickets, require("../routes/ticket"));
  }
  listen() {
    this.#app.listen(this.#port, () => {
      console.log(`escuchando en el puerto: ${this.#port}`);
    });
  }
}
module.exports = Server;
