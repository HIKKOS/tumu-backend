import Express from "express";
import { ProductController } from "../controllers/product";


const router = Express.Router();
const controller = new ProductController();
router.get(
  "/",

  controller.getAll
);
router.post(
  "/",

  controller.post
);
module.exports = router;
