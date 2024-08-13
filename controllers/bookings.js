import { AssessmentModel } from "../models/assessments.js";
import { BookingModel } from "../models/bookings.js";
import { ChatModel } from "../models/chat.js";
import { DoctorModel } from "../models/doctors.js";
import { MessageModel } from "../models/message.js";
import { UserModel } from "../models/user.js";

import { createNotification } from "./notification.js";

export const getBookings = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        const allBookings = await BookingModel.find({ user: userId })
        res.status(200).json({ message: 'Appointments retrieved', booking: allBookings })
    } catch (error) {
        res.status(400).json('Error: ' + err)
    }
}
export const getDoctors = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        const allDoctors = await DoctorModel.find({ user: userId })
        res.status(200).json({ message: 'Appointments retrieved', booking: allDoctors })
    } catch (error) {
        res.status(400).json('Error: ' + err)
    }
}

export const addBookings = async (req, res, next) => {
    try {
        const { error, value } = req.body
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const doctor = await DoctorModel.findById(req.params.id);
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        const newBookings = await BookingModel.create({
            ...value,
            user: userId,
            doctor
        })
        // Create a notification for the user
        await createNotification(userId, 'appointmentReminder', `You have an upcoming appointment with ${doctor} on ${appointmentDate} at ${appointmentTime}`);
        await newBookings.save()
        res.status(200).json({ message: 'Appointments created', booking: newBookings })
    } catch (error) {
        res.status(400).json('Error: ' + err)
    }
}
export const addDoctors = async (req, res, next) => {
    try {
        const { error, value } = req.body
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const newDoctor = await DoctorModel.create({
            ...value,
            user: userId,
            image: req.file.filename
        })
        await newDoctor.save()
        res.status(200).json({ message: 'New doctor added', doctor: newDoctor })
    } catch (error) {
        res.status(400).json('Error: ' + err)
    }
}

export const updateBookings = async (req, res, next) => {
    try {
        const { error, value } = req.body
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const doctor = await DoctorModel.findById(req.params.id);
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        const updateBookings = await BookingModel.findByIdAndUpdate(
            req.params.id,
            {
                ...value,
                user: userId,
                doctor
            },
            { new: true }
        )
        if (!updateBookings) {
            return res.status(404).send('Appointment not found');
        }
        res.status(200).json({ message: 'Appointments updated', booking: updateBookings })
    } catch (error) {
        res.status(400).json('Error: ' + err)
    }
}
export const updateDoctors = async (req, res, next) => {
    try {
        const { error, value } = req.body
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const updateDoctors = await DoctorModel.findByIdAndUpdate(
            req.params.id,
            {
                ...value,
                user: userId,
            },
            { new: true }
        )
        if (!updateDoctors) {
            return res.status(404).send('Doctor not found');
        }
        //await updateDoctors.save()
        res.status(200).json({ message: 'Doctor updated', doctor: updateDoctors })
    } catch (error) {
        res.status(400).json('Error: ' + err)
    }
}

export const deleteBookings = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const deletedBookings = await BookingModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Appointments deleted', booking: deletedBookings })
    } catch (error) {
        res.status(400).json('Error: ' + err)
    }
}
export const deleteDoctors = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const deletedDoctor = await DoctorModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Doctor deleted', doctor: deletedDoctor })
    } catch (error) {
        res.status(400).json('Error: ' + err)
    }
}

export const createChat = async (req, res) => {
    const { senderId, receiverId } = req.body
    const userId = req?.user?.id;
    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    const newChat = await ChatModel.create({
        senderId, receiverId
    });
    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const addMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const message = new MessageModel({
        chatId,
        userId,
        text,
    });
    try {
        const result = await message.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const result = await MessageModel.find({ chatId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

