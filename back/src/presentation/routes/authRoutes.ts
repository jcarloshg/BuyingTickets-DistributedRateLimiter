import { Router } from "express";
import { zodValidate } from "../middlewares/zodValidate";
import { signUpController } from "../controllers/SignUpController";
import { loginController } from "../controllers/LoginController";
import { refreshTokenController } from "../controllers/RefreshTokenController";
import { SignUpInputSchema } from "../../application/auth/sign-up/models/SignUpInput";
import { LoginInputSchema } from "../../application/auth/login/models/LoginInput";
import { RefreshTokenInputSchema } from "../../application/auth/refresh-token/models/RefreshTokenInput";
import { LogInRateLimiterMiddleware } from "../middlewares/LogginRateLimiter.middleware";

const router = Router();

router.post(
    "/signup",
    zodValidate(SignUpInputSchema),
    signUpController
);
router.post(
    "/login",
    LogInRateLimiterMiddleware,
    zodValidate(LoginInputSchema),
    loginController
);
router.post(
    "/refresh-token",
    zodValidate(RefreshTokenInputSchema),
    refreshTokenController
);

export default router;
