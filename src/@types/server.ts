import express from "express";
import cors from "cors";
import "dotenv/config";
export default class Server {
  private app: express.Application;
  private port: string | undefined;
  private paths = {
    users: "/api/users",
  };
  constructor() {
    this.app = express();
    this.app.use(express.json());
    console.log(process.env.PORT || "qwq");
    this.port = process.env.PORT;
    //Middlewares
    this.middlewares();
    //rutas de mi apliacion
    this.routes();
    //conectar a la base de datos
    //this.conectarDb()
  }

  middlewares() {
    //directorio publico
    this.app.use(express.static("public"));
    //cors
    this.app.use(cors());
    //lectura y parse del body
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.paths.users, require("../routes/user"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`escuchando en el puerto: ${this.port}`);
    });
  }
}
module.exports = Server;
