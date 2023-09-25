import Express from "express";
import userController from "../controllers/user";
import { check } from "express-validator";
import {
  validateFields,
  userRequiredFields,
  validatePagination,
} from "../middlewares/index";
import { existEmail, existPhone, existUser } from "../utils/dbValidator";

const router = Express.Router();
router.get("/", [validatePagination, validateFields], userController.getAll);

router.get(
  "/:id",
  [
    check("id", "el id debe ser numerico").isNumeric(),
    check("id").custom(existUser),
    validateFields,
  ],
  userController.get
);

router.post(
  "/",
  [
    ...userRequiredFields,
    check("phone").custom(existPhone),
    check("email").custom(existEmail),
    validateFields,
  ],
  userController.post
);
router.put(
  "/:id",
  [check("id").custom(existUser), validateFields],
  userController.put
);
router.delete(
  "/:id",
  [check("id").custom(existUser), validateFields],
  userController.delete
);

module.exports = router;
