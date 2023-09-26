import Express from "express";
import userController from "../controllers/user";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validateJwt";
import {
  validateFields,
  userRequiredFields,
  validatePagination,
} from "../middlewares/index";
import { existEmail, existPhone, existUserId } from "../utils/dbValidator";

const router = Express.Router();
router.use(validateJWT);
router.get("/", [validatePagination], userController.getAll);

router.get(
  "/:id",
  [check("id").custom(existUserId), validateFields],
  userController.get
);

router.post(
  "/",
  [
    ...userRequiredFields,
    check("phone").custom(existPhone),
    check("email").custom(existEmail),
  ],
  userController.post
);
router.put(
  "/:id",
  [check("id").custom(existUserId), validateFields],
  userController.put
);
router.delete(
  "/:id",
  [check("id").custom(existUserId), validateFields],
  userController.delete
);

module.exports = router;
