import bcryptjs from "bcryptjs";

export default class Encrypter {
  private static salt: string = bcryptjs.genSaltSync(10);
  public static encryptPassword(password: string): string {
    return bcryptjs.hashSync(password, this.salt);
  }
  public static comparePassword(
    password: string,
    hashedPassword: string
  ): boolean {
    return bcryptjs.compareSync(password, hashedPassword);
  }
}
