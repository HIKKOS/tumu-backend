import prisma from "../services/prisma_client";
const enum entities {
  categories = "categories",
  users = "users",
}

export const existEntity = async (
  id: number,
  type: entities
): Promise<boolean> => {
  switch (type) {
    case entities.categories:
      return await existCategory(id);
    case entities.users:
      return await existUserId(id);
    default:
      throw new Error(`el tipo ${type} no es valido`);
  }
};
/**checks if the email exist */
export const existEmail = async (email: string): Promise<boolean> => {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
      AND: {
        status: true,
      },
    },
  });
  if (user) {
    throw new Error(`el correo ${email} ya esta registrado`);
  }
  return true;
};
/**checks if the phone number exist */
export const existPhone = async (phone: string): Promise<boolean> => {
  const user = await prisma.users.findFirst({
    where: {
      phone: phone,
      AND: {
        status: true,
      },
    },
  });
  if (user) {
    throw new Error(`el número telefónico ${phone} ya esta registrado`);
  }
  return true;
};
/**checks if the user exist by finding its id  */
export const existUserId = async (id: number): Promise<boolean> => {
  if (isNaN(id)) {
    throw new Error(`el id debe ser numericossss`);
  }
  const user = await prisma.users.findFirst({
    where: {
      id: Number(id),
      AND: {
        status: true,
      },
    },
  });
  if (!user) {
    throw new Error(`no existe el usuario con id: ${id}`);
  }
  return true;
};
export const existUserEmail = async (email: string): Promise<boolean> => {
  const user = await prisma.users.findFirst({
    where: {
      email,
      AND: {
        status: true,
      },
    },
  });
  if (user) {
    return true;
  }
  throw new Error(`no existe el correo: ${email}`);
};
export const existCategory = async (id: number): Promise<boolean> => {
  if (isNaN(id)) {
    throw new Error(`el id debe ser numerico`);
  }
  const category = await prisma.categories.findFirst({
    where: {
      id: Number(id),
      AND: {
        status: true,
      },
    },
  });
  if (!category) {
    throw new Error(`no existe el usuario con id: ${id}`);
  }
  return true;
};
