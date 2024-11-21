import { Request, Response } from "express";
import prisma from "../services/prisma_client";
import Encrypter from "../utils/bycript";
 

class AuthController {
  static #instance: AuthController;
  private constructor() {}
  public static getInstance(): AuthController {
    if (!AuthController.#instance) {
      AuthController.#instance = new AuthController();
    }
    return AuthController.#instance;
  }
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await prisma.users.findFirst({
      where: {
        email,
         
      },
       
      
    });
    if (
      email === user!.email &&
      Encrypter.comparePassword(password, user!.userPassword)
    ) {
      try {
   
        return res.json({
          code: 200,
          user,
      
        });
      } catch (error) {
        return res.status(500).json({
          msg: "no se pudo generar el JWT",
        });
      }
    } else {
      return res.status(400).json({
        msg: "usuario o contraseña incorrectos",
      });
    }
  }
}
export default AuthController.getInstance();
