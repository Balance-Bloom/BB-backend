import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.js";
import bookingRouter from "./routes/bookings.js";


//Make database connection
await mongoose.connect(process.env.mongo_uri)
console.log("BnB database connected and ready")

// Create app
const app = express();

// Use middleware
app.use(express.json());
app.use(cors())

//Use routes
app.use('/api/v1', authRouter)
app.use('/api/v1', bookingRouter)

// Listen for incoming request
const port = process.env.PORT || 3443
app.listen(port, () => {
    console.log(
        `Server running on port ${port}`
    )
})