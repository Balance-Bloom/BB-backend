import { model, Schema, Types } from "mongoose";

const notificationSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['appointmentReminder', 'message', 'system', 'other'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const NotificationModel = model('notification', notificationSchema)