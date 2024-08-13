import { CycleModel } from "../models/cyles.js";
import { UserModel } from "../models/user.js";

export const createPeriod = async (req, res) => {
    try {
        const { startDate, endDate, flow, symptoms, notes } = req.body;
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Validate input data
        const newPeriod = await CycleModel.create({
            user,
            startDate,
            endDate,
            flow,
            symptoms,
            notes,
        });

        const savedPeriod = await newPeriod.save();
        res.status(201).json(savedPeriod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create period' });
    }
};

export const predictNextPeriod = async (req, res) => {
    try {
        const { userId } = req.params;

        // Retrieve user's period history
        const periods = await CycleModel.find({ userId }).sort({ startDate: -1 });

        // Filter out periods with insufficient data (e.g., less than 3 cycles)
        const validPeriods = periods.filter(period => {
            // Define criteria for valid periods (e.g., minimum cycle length)
            return period.endDate && (previousPeriod ? period.startDate - previousPeriod.endDate >= minimumCycleLength : true);
        });

        // Calculate average cycle length
        const totalCycleLength = validPeriods.reduce((acc, period, index) => {
            if (index > 0) {
                acc += period.startDate - previousPeriods[index - 1].endDate;
            }
            return acc;
        }, 0);
        const averageCycleLength = Math.round(totalCycleLength / (validPeriods.length - 1));

        // Calculate standard deviation (optional for more accurate predictions)
        // ...

        // Determine the last period's end date
        const lastPeriodEndDate = periods[0].endDate;

        // Calculate predicted start date
        const predictedStartDate = new Date(lastPeriodEndDate);
        predictedStartDate.setDate(lastPeriodEndDate.getDate() + averageCycleLength);

        // Adjust predicted date based on standard deviation (optional)
        // ...

        res.status(200).res.json({ predictedStartDate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to predict next period' });
    }
};

export const updatePeriod = async (req, res, next) => {
    try {
        const { error, value } = req.body
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const period = await CycleModel.findById(req.params.id);
        if (!doctor) {
            return res.status(404).send('Cycle not found');
        }
        const updatedPeriod = await CycleModel.findByIdAndUpdate(
            req.params.id,
            {
                ...value,
                user,
                period
            },
            { new: true }
        )
        if (!updatedPeriod) {
            return res.status(404).send('Period not updated');
        }
        res.status(200).json({ message: 'Cycle updated', Cycle: updatedPeriod })
    } catch (error) {
        res.status(400).json('Error: ' + err)
    }
}