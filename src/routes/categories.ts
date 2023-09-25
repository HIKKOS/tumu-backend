import Express from "express";
import categoryController from "../controllers/categories";
import { check } from "express-validator";
import { validateFields, validatePagination } from "../middlewares/index";

const router = Express.Router();
router.get(
  "/",
  [validatePagination, validateFields],
  categoryController.readAll
);

router.get(
  "/:id",
  [check("id", "el id debe ser numerico").isNumeric(), validateFields],
  categoryController.readAll
);

router.post("/", [validateFields], categoryController.create);
router.put(
  "/:id",

  categoryController.update
);
router.delete(
  "/:id",

  categoryController.delete
);

module.exports = router;
