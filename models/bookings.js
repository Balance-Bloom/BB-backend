import { model, Schema, Types } from "mongoose";

const bookingSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User' },
    doctorId: { type: Types.ObjectId, ref: 'doctor' },
    assessmentId: {
        type: Types.ObjectId,
        ref: 'assessment'
    },
    appointmentDate: { type: Date },
    appointmentType: { type: String, enum: ['Therapy', 'Physical-Check-Up'] },
    appointmentStatus: { type: String, enum: ['Booked', 'Cancelled', 'Completed'] },
}, {
    timestamps: true
})

export const BookingModel = model('booking', bookingSchema)