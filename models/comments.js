import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema({
    user: {type: Types.ObjectId, ref: 'User'},
    forum: {type: Types.ObjectId, ref: 'forum'},
    desc: { type: String }
},{
    timestamps:true
})

export const CommentModel = model('comment', commentSchema);