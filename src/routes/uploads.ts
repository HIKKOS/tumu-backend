import Express from "express";
import { createPhoto } from "../controllers/uploads";

const router = Express.Router();
router.post("/", createPhoto);
module.exports = router;
