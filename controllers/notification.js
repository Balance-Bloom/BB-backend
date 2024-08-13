import { NotificationModel } from "../models/notification.js";
import { UserModel } from "../models/user.js";
import { Socket } from "socket.io";


export const createNotification = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const notification = await NotificationModel.create({ userId, type, message });
        await notification.save();
        Socket.emit('newNotification', notification);
        return notification;
    } catch (error) {
        next(error)
    }
}

export const getNotification = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const notifications = await NotificationModel.find({ userId }).sort({ createdAt: -1 });
        return notifications;
    } catch (error) {
        next(error)
    }
}

export const markNotification = async (req, res, next) => {
    const notification = await NotificationModel.findById(req.params.id);
    if (!notification) {
        return res.status(404).send('Doctor not found');
    }
    await NotificationModel.updateMany({ _id: { $in: notification } }, { isRead: true });
}