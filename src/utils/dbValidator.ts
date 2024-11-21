
import prisma from "../services/prisma_client";


 
/**checks if the email exist */
export const existEmail = async (email: string): Promise<boolean> => {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
       
    },
  });
  if (user) {
    throw new Error(`el correo ${email} ya esta registrado`);
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
     
    },
  });
  if (!user) {
    throw new Error(`no existe el usuario con id: ${id}`);
  }
  return true;
};   
   