import Express from "express";
import productsController from "../controllers/products";
import { check } from "express-validator";
import { validateFields, validatePagination } from "../middlewares/index";
import { existProduct } from "../utils/dbValidator";

const router = Express.Router();

router.get(
  "/",
  [validatePagination, validateFields],
  productsController.getAll
);

router.get(
  "/:id",
  [check("id").custom(existProduct), validateFields],
  productsController.get
);

router.post(
  "/",
  [check("productName").notEmpty(), validateFields],
  productsController.post
);

router.put(
  "/:id",
  [
    check("id").custom(existProduct),
    check("productName").notEmpty(),
    validateFields,
  ],
  productsController.put
);

router.delete(
  "/:id",
  [check("id").custom(existProduct)],
  productsController.delete
);

module.exports = router;
