import { model, Schema, Types } from "mongoose";

const assessmentSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User' },
    type: {
        type: String,
        enum: ['mentalHealth', 'gynecological', 'other'], // Add more types as needed
        required: true
    },
    questions: [{
        type: String,
        enum:['In the past month, have you lost interest or pleasure in things you usually like to do?','Have you felt sad, low, down, depressed, or hopeless?','How has your sleep been lately? Are you experiencing any difficulties with falling asleep, staying asleep, or waking up too early?','How are your relationships with family, friends, or colleagues?','Do you consume alcohol? If so, how often and in what quantities?', 'How would you describe your overall well-being?' ],
        answer: String, // Can be adjusted to accommodate different answer types (e.g., multiple choice, text)
    }],
    results: {
        type: Object, // Store assessment results in a structured format
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const AssessmentModel = model('assessment', assessmentSchema)