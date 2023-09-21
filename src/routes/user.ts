import Express, { Request, Response } from "express";
import { getById, getAll } from "../controllers/user";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";

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
        .json({ msg: `No existe un usuario con el id ${id}` });
    }
    return res.json({ user });
  }
);

module.exports = router;
