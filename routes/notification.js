import { Router } from "express";
import { createNotification, getNotification, markNotification } from "../controllers/notification.js";

const notificationRouter = Router()


notificationRouter.get('/notification', getNotification);
notificationRouter.post('/notification', createNotification);
notificationRouter.patch('/notification', markNotification);

export default notificationRouter;