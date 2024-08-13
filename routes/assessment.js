import { Router } from "express";
import { createAssessment, getAssessment, updateAssessment } from "../controllers/assessment.js";
import { isAuthenticated } from "../middlewares/auth.js";

const assessmentRouter = Router()


assessmentRouter.get('/assessment',isAuthenticated, getAssessment);
assessmentRouter.post('/assessment', isAuthenticated, createAssessment);
assessmentRouter.patch('/assessment', isAuthenticated, updateAssessment);


export default assessmentRouter;
