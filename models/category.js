import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    generalHealth: [{ type: String, enum: ['Mental-health', 'Physical-health', 'Nutrition & Diet', 'Fitness', 'Sleep & Relaxation'] }],
    relationship: [{ type: String, enum: ['Love & Relationship', 'Sex & Intimacy', 'Parenting', 'Divorce & Separation', 'LGBTQ+'] }],
    careerEducation: [{ type: String, enum: ['Career-Advice', 'Job-Hunting', 'Education & Training', 'Work-life balance', 'Entrepreneurship'] }],
    beautyFashion: [{ type: String, enum: ['Skincare', 'Haircare', 'Makeup', 'Fashion Trends', 'Style Tips'] }],
    lifestyleInterest: [{ type: String, required: true, enum: ['Travel & Adventure', 'Hobbies & Craft', 'Cooking & Recipes', 'Home & Decor', 'Books & Literature'] }],
    supportCommunity: [{ type: String, enum: ['Support Groups', 'Self-esteem', 'Grief & Loss', 'Financial Wellness', 'Menopause'] }],
    ageSpecific: [{ type: String, enum: ['Teen Talk', 'Young Women', 'Midlife', 'Mature'] }]
})

export const CategoryModel = model('category', categorySchema)