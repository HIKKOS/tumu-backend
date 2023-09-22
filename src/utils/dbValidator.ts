import prisma from "../services/prisma_client";
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
export const existUser = async (id: string): Promise<boolean> => {
  const idToNumber = parseInt(id);
  if (isNaN(idToNumber)) {
    throw new Error(`el id debe ser numerico`);
  }
  const user = await prisma.users.findFirst({
    where: {
      id: idToNumber,
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
