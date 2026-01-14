import { Express, Router } from "express";
import { SignUpController } from "../controllers/auth/SignUpController.js";
import { LoginController } from "../controllers/auth/LoginController.js";
import { zodValidate } from "../middlewares/zodValidate.js";
import { signUpInputSchema } from "../../application/auth/sign-up/models/entities/SignUpInput.js";
import { loginInputSchema } from "../../application/auth/login/models/entities/LoginInput.js";

export const createAuthRoutes = (app: Express) => {
    const router = Router();
    const signUpController = new SignUpController();
    const loginController = new LoginController();

    router.post(
        "/sign-up",
        zodValidate(signUpInputSchema),
        signUpController.handle.bind(signUpController)
    );

    router.post(
        "/login",
        zodValidate(loginInputSchema),
        loginController.handle.bind(loginController)
    );

    app.use("/api/auth", router);
};
