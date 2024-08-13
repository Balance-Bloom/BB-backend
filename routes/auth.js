import { Router } from "express";
import { changeProfileImage, getUser, login, logout, OPTVerification, passwordForgot, passwordReset, register, sendVerificationEmail } from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

const authRouter = Router();


//Define routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/forgot-password', passwordForgot);
authRouter.post('/resetPassword/:token', passwordReset);
authRouter.post('/verify-email', sendVerificationEmail);
authRouter.post('/verify-otp', OPTVerification);

authRouter.get('/logout',isAuthenticated, logout);
authRouter.get('/user',isAuthenticated, getUser);
authRouter.patch('/logout',remoteUpload.single('profileImage'),isAuthenticated, changeProfileImage);



// Export router
export default authRouter;