import { User } from "../models/user";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAll = async (): Promise<Object> => {
  const users: User[] = (await prisma.users.findMany()) || [];
  const count: number = await prisma.users.count();
  /* const users: User[] = [
    {
      id: 1,
      firstName: "Juan",
      lastName: "Perez",
      email: "email",
      password: "password",
      phone: "phone",
      rolId: 1,
    },
    {
      id: 2,
      firstName: "Pedro",
      lastName: "Ku",
      email: "email",
      password: "password",
      phone: "phone",
      rolId: 2,
    },
  ]; */
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
