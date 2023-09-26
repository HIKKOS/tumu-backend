import Express from "express";
import { createPhoto } from "../controllers/uploads";

import { validateFields } from "../middlewares";
import multer from "../services/multer";
import { check } from "express-validator";
const router = Express.Router();
router.post(
  "/",
  [check("image").custom((_value) => multer.single("image")), validateFields],
  createPhoto
);
module.exports = router;
