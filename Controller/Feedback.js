import { FeedbackModel } from "../Model/Feedback.js";
import { RegisterationModel } from './../Model/registerationModel.js';
import mongoose from 'mongoose';

export const createFeedback = async (req, res) => {
    const { userId } = req.query;  // Extract the userId from req.query
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid userId format');
        }

        const data = await RegisterationModel.findById(userId);
        if (!data) {
            throw new Error('User not found');
        }

        const body = { ...req.body, dept: data.dept, subDept: data.subDept };
        await FeedbackModel.create(body);

        res.status(200).json({
            status: "success"
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
}


export const getFeedBack = async (req, res) => {
    const { userId } = req.query;  // Extract the userId from req.query
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid userId format');
        }

        const data = await RegisterationModel.findById(userId);
        if (!data) {
            throw new Error('User not found');
        }

        const fdata = await FeedbackModel.find({dept: data.dept, subDept: data.subDept})

        res.status(200).json(fdata);
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
}