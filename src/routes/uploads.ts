import Express from "express";
import { check } from "express-validator";
import { createPhoto, getPhoto } from "../controllers/uploads";
import { existEntity } from "../utils/dbValidator";
import { Entities } from "../utils/enums";
import { validateFields } from "../middlewares";

const router = Express.Router();
router.post(
  "/products/:id",
  [
    check("id").custom((id) => existEntity(id, Entities.products)),
    validateFields,
  ],
  createPhoto
);
router.get(
  "/:itemName/:id/:photoName",
  [
    check("itemName").isIn(["products"]),
    check("photoName", "no debe ser vacio").notEmpty(),
    check("id").custom((id) => existEntity(id, Entities.products)),
    validateFields,
  ],
  getPhoto
);
module.exports = router;
