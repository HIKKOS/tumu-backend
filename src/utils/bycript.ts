import bcryptjs from "bcryptjs";
const salt = bcryptjs.genSaltSync(10);
export const encryptPassword = (password: string): string =>
  bcryptjs.hashSync(password, salt);
export const comparePassword = (
  password: string,
  hashedPassword: string
): boolean => bcryptjs.compareSync(password, hashedPassword);
