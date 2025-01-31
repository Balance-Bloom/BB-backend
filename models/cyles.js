import { Schema,Types,model } from "mongoose";

const cycleSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User' }, //Reference to the user
    startDate: { type: Date }, //Start date of the cycle
    endDate: { type: Date },// End date of the cycle
    periodLength: { type: Number }, //Length of the period
    cycleLength: { type: Number }, // Length of the cycle
    symptoms: [{ type: String }], //Array of symptoms
    mood: { type: Number }, //Mood tracking data
    flow: { type: String }, //Flow tracking data
    notes: { type: String }, //User's notes
    ovulationDate: { type: Date }, //Estimated ovulation date
    fertileWindow: { type: Number },
    pregnancyTest: { type: Boolean, default: true },//Pregnancy test result (if applicable)
    basalBodyTemperature: { type: Number }, //Basal body temperature data
    cervicalMucus: { type: Boolean }, // Cervical mucus observations
})

export const CycleModel = model('cycle', cycleSchema)