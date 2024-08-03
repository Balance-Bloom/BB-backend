import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, default: 'user' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    birthDate: { type: Date },
    cycle: [{ type: Types.ObjectId, ref: 'cycle'}],
    notification: [{ type: Types.ObjectId, ref: 'notification'}],
    incidentType: {type: String, enum: ['Criminal','Non-Criminal']},


}, {
    timestamps: true
})

export const UserModel =model('User', userSchema)