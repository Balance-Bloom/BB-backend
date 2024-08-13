import { AssessmentModel } from "../models/assessments.js";
import { UserModel } from "../models/user.js";

export const createAssessment = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const assessment = await AssessmentModel.create({ userId, type, questions });
        await assessment.save();
        return assessment;
    } catch (error) {
        next(error)
    }
}

export const getAssessment = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const notifications = await AssessmentModel.find({ userId }).sort({ createdAt: -1 });
        return notifications;
    } catch (error) {
        next(error)
    }
}

export const updateAssessment = async (req, res, next) => {
    const assessmentId = req.params;
    const updateAssessment = req.body

    const assessment = await AssessmentModel.findByIdAndUpdate(assessmentId, updateAssessment, { new: true });
    return assessment;
}