import Express, { Request, Response } from "express";
import { getById, getAll, create } from "../controllers/user";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { existEmail } from "../utils/dbValidator";

const router = Express.Router();
router.get(
  "/",
  [
    /* middleware1,middleware1 */
  ],
  async (_: Request, res: Response) => {
    const users: Object = await getAll();
    return res.json(users);
  }
);
router.get(
  "/:id",
  [check("id", "el id debe ser numerico").isNumeric(), validateFields],
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await getById(id);
    if (!user) {
      return res
        .status(404)
        .json({ code: 404, msg: `No existe un usuario con el id ${id}` });
    }
    return res.json({ user });
  }
);

router.post(
  "/",
  [
    check("firstName", "no debe ser vacio").notEmpty(),
    check("lastName", "no debe ser vacio").notEmpty(),
    check("phone", "debe ser de almenos 10 digitos y numerico")
      .isLength({ min: 10 })
      .isNumeric(),
    check("email", "No tiene el formato de un correo").isEmail(),
    check("email").custom(existEmail),
    check("password", "deben ser minimo 8 caracteres").isLength({ min: 8 }),
    validateFields,
  ],
  async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const result = await create(body);
      return res.json(result);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ code: 500, msg: error });
    }
  }
);

module.exports = router;
