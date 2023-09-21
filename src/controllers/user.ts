import { User } from "../models/user";
import prisma from "../services/prisma_client";
export const getAll = async (): Promise<Object> => {
  const users: User[] = (await prisma.users.findMany()) || [];
  const count: number = await prisma.users.count();
  return { count, users };
};
export const getById = async (id: number): Promise<User> => {
  const user: User = (await prisma.users.findUnique({
    where: {
      id: id,
    },
  })) as User;
  return user;
};
export const create = async (user: User): Promise<Object> => {
  const newUser: User = await prisma.users.create({
    data: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      phone: user.phone,
    },
  });
  return { msg: "Usuario creado correctamente", id: newUser.id };
};
