import { model, Schema, Types } from "mongoose";

const forumSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User' },
    author: { type: String, default: 'admin' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    category:{ type:String, enum: ['General Health', 'Relationship', 'Career & Education', 'Beauty & Fashion', 'Lifestyle & Interest', 'Support & Community', 'Age Specific']},
    categoryId: { type: Types.ObjectId, ref: 'category', required: true },
    likes: { type: Number, default: 0 },
    comments: [{ type: Types.ObjectId, ref: 'comment' }],
    favourite: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})

export const ForumModel = model('forum', forumSchema);