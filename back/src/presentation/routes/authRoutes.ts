import { Express, Router } from "express";
import { SignUpController } from "../controllers/auth/SignUpController";
import { LoginController } from "../controllers/auth/LoginController";
import { zodValidate } from "../middlewares/zodValidate";
// schemas
import { signUpInputSchema } from "../../application/auth/sign-up/models/entities/SignUpInput";
import { loginInputSchema } from "../../application/auth/login/models/entities/LoginInput";

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
