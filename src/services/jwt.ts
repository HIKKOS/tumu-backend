import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export function generateJWT(id: number, role: string) {
  const salt = bcryptjs.genSaltSync(12);
  const secret = process.env.SECRETORPRIVATEKEY;
  const promise = new Promise((resolve, reject) => {
    role = bcryptjs.hashSync(role, salt);
    const payload = { id, role };
    jwt.sign(payload, secret!, (err, token) => {
      if (err) {
        reject("no se genero el JWT");
      } else {
        resolve(token);
      }
    });
  });
  return promise;
}
