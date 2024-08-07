import { model, Schema, Types } from "mongoose";

const journalSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    createAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
});

export const JournalModel = model('journal', journalSchema)