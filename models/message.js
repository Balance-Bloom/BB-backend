import { model, Schema, Types } from "mongoose";

const messageSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User' },
    chatId: { type: Types.ObjectId, ref: 'chat' },
    content:{ type: String, required: true }
},{
    timestamps:true
})

export const MessageModel = model('message', messageSchema)