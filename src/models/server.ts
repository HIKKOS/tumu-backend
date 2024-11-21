import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cors from "cors";
import "dotenv/config";
export default class Server {
  #app: express.Application;
  #port: string | undefined;
  #paths = {
    auth: "/api/auth",
    products: "/api/products",
  };
  constructor() {
    this.#app = express();
    this.#app.use(express.json());
    this.#app.use(fileUpload());
    this.#app.use(morgan("dev"));
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
    this.#app.use(this.#paths.products, require("../routes/products"));
  }
  listen() {
    this.#app.listen(this.#port, () => {
      console.log(`escuchando en el puerto: ${this.#port}`);
    });
  }
}
module.exports = Server;
