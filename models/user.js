import { Schema, model, Types } from "mongoose";

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
    messages: [{ type: Types.ObjectId, ref: 'message' }],
    incidentType: { type: String, enum: ['Criminal', 'Non-Criminal'] },


}, {
    timestamps: true
})

export const UserModel = model('User', userSchema)