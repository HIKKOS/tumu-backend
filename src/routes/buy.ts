import Express from "express";
import buyController from "../controllers/buy";

const router = Express.Router();

router.post('/',
    buyController.post
)

module.exports = router;