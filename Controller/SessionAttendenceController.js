import mongoose from 'mongoose'
import { AttendenceModel } from '../Model/attendenceModel.js';

export const addSessionAttendence = async (req, res) => {
    const { mentorId, eventName, eventDate, eventAttendence } = req.body;
    try{
        if(!mentorId || !eventName || !eventDate || !eventAttendence.length) throw new Error('Please Fill All Fields')
        if(!mongoose.Types.ObjectId.isValid(mentorId)) throw new Error('Invalid ID')
        const data = await AttendenceModel.create({mentorId: mentorId, eventName:eventName, eventDate:eventDate, eventAttendence: eventAttendence});
        res.status(200).json({
            status: 'success',
            data
        })
    }catch(err){
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}

export const getSessionAttendence = async (req, res) => {
    const { mentorId } = req.query;
    try{
        if(!mongoose.Types.ObjectId.isValid(mentorId)) throw new Error('Invalid ID')
        const data = await AttendenceModel.find({ mentorId: mentorId }).sort({ eventDate: -1 });
        res.status(200).json({
            status: 'success',
            data
        })
    }catch(err){
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}