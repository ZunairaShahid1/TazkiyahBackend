import { EbookModel } from "../Model/Ebooks.js";
import { FeedbackModel } from "../Model/Feedback.js";
import { RegisterationModel } from './../Model/registerationModel.js';
import mongoose from 'mongoose';

export const uploadEbook = async (req, res) => {
    const fileName = req.file.filename;
    const title = req.body.title;
    try {
        const data = await EbookModel.create({ name: title, link: fileName });
        if (!data) {
            throw new Error('User not found');
        }
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


export const getEbook = async (req, res) => {
    try {
        const fdata = await EbookModel.find({})
        res.status(200).json(fdata);
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
}