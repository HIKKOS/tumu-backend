import Express from "express";
import buyController from "../controllers/buy";
import { validateCompra, validateFields } from "../middlewares";
import { check } from "express-validator";
import { existStock, existUserId } from "../utils/dbValidator";

const router = Express.Router();

router.post('/',
    [
        check("userId").custom(existUserId),
        validateCompra,
        check("products").custom(existStock),
        validateFields,
        
    ],
    buyController.post
)

module.exports = router;