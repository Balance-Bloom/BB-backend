import { model, Schema, Types } from "mongoose";

const doctorSchema = new Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    bio: { type: String, required: true },
    image: {type: String, required:true },
    availability: {type:Boolean, default:true},
    messages: [{ type: Types.ObjectId, ref: 'message'}],
},{
    timestamps: true
})

export const DoctorModel = model('doctor', doctorSchema)