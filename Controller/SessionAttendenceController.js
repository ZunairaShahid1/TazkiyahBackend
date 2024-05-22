import mongoose from 'mongoose'
import { AttendenceModel } from '../Model/attendenceModel.js';
import { RegisterationModel } from './../Model/registerationModel.js';

export const addSessionAttendence = async (req, res) => {
    const { mentorId, eventName, eventDate, eventAttendence } = req.body;
    try{
        if(!mentorId || !eventName || !eventDate || !eventAttendence.length) throw new Error('Please Fill All Fields')
        if(!mongoose.Types.ObjectId.isValid(mentorId)) throw new Error('Invalid ID')
        if(new Date(eventDate).getTime() >= new Date().getTime()) throw new Error('Event date cannot be in the future')

        const mentor = await RegisterationModel.findById(mentorId);
        if(!mentor) throw new Error('Mentor not found')

        const data = await AttendenceModel.create({mentorId: mentorId, eventName:eventName, eventDate:eventDate, eventAttendence: eventAttendence, dept: mentor.dept, subDept: mentor.subDept});
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
        if(!data.length){
            throw new Error('No data found')
        }
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

export const getAllSessionAttendence = async (req, res) => {
    try{
        const filter = {}
        const { dept, subDept } = req.query;

        if(dept){
            filter.dept = dept;
        }
        if(subDept){
            filter.subDept = subDept;
        }
        const data = await AttendenceModel.find(filter).sort({ eventDate: -1 });
        if(!data.length){
            throw new Error('No data found')
        }
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