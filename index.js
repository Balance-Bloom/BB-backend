import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';
import expressOasGenerator from "@mickeymond/express-oas-generator"
import authRouter from "./routes/auth.js";
import bookingRouter from "./routes/bookings.js";
import forumRouter from "./routes/forum.js";
import periodRouter from "./routes/cycle.js";
import assessmentRouter from "./routes/assessment.js";


//Make database connection
await mongoose.connect(process.env.MONGO_URI)
console.log("BnB database connected and ready")

// Create app
const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['profile','booking', 'forum', 'cycle'],
    mongooseModels: mongoose.modelNames(),
})

// Use middleware
app.use(express.json());
app.use(cors())

//Use routes
app.use('/api/v1', authRouter)
app.use('/api/v1', bookingRouter);
app.use('/api/v1', forumRouter)
app.use('/api/v1', periodRouter)
app.use('/api/v1', assessmentRouter)

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

// Listen for incoming request
const port = process.env.PORT || 3443
app.listen(port, () => {
    console.log(
        `Server running on port ${port}`
    )
})