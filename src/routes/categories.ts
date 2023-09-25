import Express from "express";
import categoryController from "../controllers/categories";
import { check } from "express-validator";
import { validateFields, validatePagination } from "../middlewares/index";

const router = Express.Router();
router.get(
  "/",
  [validatePagination, validateFields],
  categoryController.getAll
);

router.get(
  "/:id",
  [check("id", "el id debe ser numerico").isNumeric(), validateFields],
  categoryController.getAll
);

router.post("/", [validateFields], categoryController.post);
router.put(
  "/:id",

  categoryController.put
);
router.delete(
  "/:id",

  categoryController.delete
);

module.exports = router;
