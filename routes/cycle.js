import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createPeriod, predictNextPeriod, updatePeriod } from "../controllers/cycle.js";

const periodRouter = Router();

periodRouter.get('/nextperiod', isAuthenticated, predictNextPeriod)
periodRouter.post('/period', isAuthenticated, createPeriod)
periodRouter.patch('/period/:id', isAuthenticated, updatePeriod)

export default periodRouter