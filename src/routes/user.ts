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
import { existEmail, existPhone, existUser } from "../utils/dbValidator";
import { userRequiredFields } from "../middlewares/userRequiredFields";
import { validatePagination } from "../middlewares/validatePagination";

const router = Express.Router();
router.get("/", validatePagination, getAll);

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
  [
    ...userRequiredFields,
    check("phone").custom(existPhone),
    check("email").custom(existEmail),
    validateFields,
  ],
  createUser
);
router.put("/:id", [check("id").custom(existUser), validateFields], updateUser);
router.delete(
  "/:id",
  [check("id").custom(existUser), validateFields],
  deleteUser
);

module.exports = router;
