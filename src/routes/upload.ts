import Express from "express";
import { PostController } from "../controllers/upload";

const router = Express.Router();
const controller = new PostController();

router.post("/", controller.post);
router.get("/", controller.get);
module.exports = router;
