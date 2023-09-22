import Express from "express";
import {
  getUser,
  getAll,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { existEmail, existUser } from "../utils/dbValidator";
import { userRequiredFields } from "../middlewares/userRequiredFields";

const router = Express.Router();
router.get(
  "/",

  getAll
);
router.get(
  "/:id",
  [
    check("id", "el id debe ser numerico").isNumeric(),
    check("id").custom(existUser),
    validateFields,
  ],
  getUser
);

router.post(
  "/",
  [...userRequiredFields, check("email").custom(existEmail), validateFields],
  createUser
);
router.put("/:id", [check("id").custom(existUser), validateFields], updateUser);
router.delete(
  "/:id",
  [check("id").custom(existUser), validateFields],
  deleteUser
);

module.exports = router;
