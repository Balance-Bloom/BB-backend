import { model, Schema, Types } from "mongoose";

const forumSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User' },
    author: { type: String, default: 'admin' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    category:{ type:String, enum: ['General Health', 'Relationship', 'Career & Education', 'Beauty & Fashion', 'Lifestyle & Interest', 'Support & Community', 'Age Specific'], required: true},
    subCategory:{type: String, enum:['Mental-health', 'Physical-health', 'Nutrition & Diet', 'Fitness', 'Sleep & Relaxation', 'Love & Relationship', 'Sex & Intimacy', 'Parenting', 'Divorce & Separation', 'LGBTQ+','Career-Advice', 'Job-Hunting', 'Education & Training', 'Work-life balance', 'Entrepreneurship','Skincare', 'Haircare', 'Makeup', 'Fashion Trends', 'Style Tips','Travel & Adventure', 'Hobbies & Craft', 'Cooking & Recipes', 'Home & Decor', 'Books & Literature','Support Groups', 'Self-esteem', 'Grief & Loss', 'Financial Wellness', 'Menopause','Teen Talk', 'Young Women', 'Midlife', 'Mature']},
    likes: { type: Number, default: 0 },
    comments: [{ type: Types.ObjectId, ref: 'comment' }],
    favourite: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})

export const ForumModel = model('forum', forumSchema);