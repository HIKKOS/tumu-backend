import prisma from "../services/prisma_client";
export const existEmail = async (email: string): Promise<boolean> => {
  const tutor = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
  if (tutor) {
    throw new Error(`el correo ${tutor.email} ya esta registrado`);
  }
  return true;
};
