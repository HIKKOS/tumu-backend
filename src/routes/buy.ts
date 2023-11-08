import Express from "express";
import buyController from "../controllers/buy";
import { validateCompra, validateFields } from "../middlewares";
import { check } from "express-validator";
import { existUserId } from "../utils/dbValidator";

const router = Express.Router();

router.post('/',
    [
        check("userId").custom(existUserId),
        validateFields,
        validateCompra
    ],
    buyController.post
)

module.exports = router;