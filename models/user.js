import { Schema, model, Types } from "mongoose";
import joi from "joi";

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, default: 'user' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    weight: { type: Number },
    birthDate: { type: Date },
    cycle: { type: Types.ObjectId, ref: 'cycle' },
    notification: [{ type: Types.ObjectId, ref: 'notification' }],
    appointment: [{ type: Types.ObjectId, ref: 'booking' }],
    journal: [{ type: Types.ObjectId, ref: 'journal' }],
    messages: [{ type: Types.ObjectId, ref: 'message' }]
}, {
    timestamps: true
})

export const UserModel = model('User', userSchema)

export const registerValidator = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
})

export const loginValidator = joi.object({
    username: joi.string().alphanum(),
    email: joi.string().email(),
    password: joi.string().required(),
});