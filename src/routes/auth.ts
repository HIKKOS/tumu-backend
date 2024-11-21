import Express from "express";
import auth from "../controllers/auth";
import { validateFields } from "../middlewares";
import { check } from "express-validator";

const router = Express.Router();
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  auth.login
);
module.exports = router;
