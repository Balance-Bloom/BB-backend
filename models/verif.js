import { model, Schema, Types } from "mongoose";

const emailVerificationSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User'},
    token: { type: String },
    createdAt: { type: Date },
    expiresAt: { type: Date },
});

export const VerificationModel = model('Verification', emailVerificationSchema)