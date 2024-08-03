import { Router } from "express";
import { login, logout, passwordForgot, passwordReset, register } from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/auth.js";

const authRouter = Router();


//Define routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/forgot-password', passwordForgot);
authRouter.post('/resetPassword/:token', passwordReset);
authRouter.post('/logout',isAuthenticated, logout);



// Export router
export default authRouter;