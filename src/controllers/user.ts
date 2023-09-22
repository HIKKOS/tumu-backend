import { Request, Response } from "express";
import { encryptPassword } from "../utils/bycript";
import { User } from "../models/user";
import prisma from "../services/prisma_client";
const select = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  role: true,
  status: true,
  rolId: false,
  userPassword: false,
};

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { limit = "5", page = "1" } = req.query;
  const users: User[] = await prisma.users.findMany({
    where: { status: true },
    skip: Number(page) - 1,
    take: Number(limit),
    select,
  });

  const count: number = await prisma.users.count({
    where: { status: true },
  });
  return res.json({ count, users });
};
export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  const user: User | null = await prisma.users.findUnique({
    where: {
      id: id,
    },
    select,
  });

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
        userPassword: encryptPassword(body.password),
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
      include: { role: true },
    });
    const newUser: User = await prisma.users.update({
      where: {
        id: parseInt(params.id),
      },
      include: { role: true },
      data: {
        email: body.email || oldUser!.email,
        firstName: body.firstName || oldUser!.firstName,
        lastName: body.lastName || oldUser!.lastName,
        userPassword: body.password || oldUser!.userPassword,
        phone: body.phone || oldUser!.phone,
        role: body.role || oldUser!.role,
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
