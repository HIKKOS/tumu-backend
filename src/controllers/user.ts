import { Request, Response } from "express";
import { User } from "../models/user";
import prisma from "../services/prisma_client";
export const getAll = async (_: Request, res: Response): Promise<Response> => {
  const users: User[] = await prisma.users.findMany({
    where: { status: true },
  });
  const count: number = await prisma.users.count({ where: { status: true } });
  return res.json({ count, users });
};
export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  const user: User = (await prisma.users.findUnique({
    where: {
      id: id,
    },
  })) as User;
  return res.json(user);
};
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { body } = req;
    const newUser: User = await prisma.users.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        userPassword: body.password,
        phone: body.phone,
      },
    });
    return res.json({
      msg: `Se creo el usuario ${newUser.firstName} con id ${newUser.id}`,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ code: 500, msg: error });
  }
};
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { params, body } = req;
    const oldUser: User | null = await prisma.users.findUnique({
      where: { id: parseInt(params.id) },
    });
    const newUser: User = await prisma.users.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        email: body.email || oldUser!.email,
        firstName: body.firstName || oldUser!.firstName,
        lastName: body.lastName || oldUser!.lastName,
        userPassword: body.password || oldUser!.userPassword,
        phone: body.phone || oldUser!.phone,
      },
    });
    return res.json({
      msg: `Se actualizo el usuario con id ${newUser.id}`,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ code: 500, msg: error });
  }
};
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        status: false,
      },
    });
    return res.json({
      msg: `Se elimino el usuario con id ${id}`,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ code: 500, msg: error });
  }
};
