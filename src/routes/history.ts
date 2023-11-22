import  Express  from "express";
import historyController from "../controllers/history";
import { validateFields, validatePagination } from "../middlewares";



const router = Express.Router();

router.get(
    '/',
    [validateFields, validatePagination],
    historyController.getAll
)

module.exports = router;