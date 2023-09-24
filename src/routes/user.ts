import Express from "express";
import userController from "../controllers/user";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { existEmail, existPhone, existUser } from "../utils/dbValidator";
import { userRequiredFields } from "../middlewares/userRequiredFields";
import { validatePagination } from "../middlewares/validatePagination";

const router = Express.Router();
router.get("/", [validatePagination, validateFields], userController.readAll);

router.get(
  "/:id",
  [
    check("id", "el id debe ser numerico").isNumeric(),
    check("id").custom(existUser),
    validateFields,
  ],
  userController.readAll
);

router.post(
  "/",
  [
    ...userRequiredFields,
    check("phone").custom(existPhone),
    check("email").custom(existEmail),
    validateFields,
  ],
  userController.create
);
router.put(
  "/:id",
  [check("id").custom(existUser), validateFields],
  userController.update
);
router.delete(
  "/:id",
  [check("id").custom(existUser), validateFields],
  userController.delete
);

module.exports = router;
