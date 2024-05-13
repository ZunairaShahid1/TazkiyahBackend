import { EventsModel } from './../Model/eventModel.js';


export const GetAllEvents = async (req, res) => {
    try {
        const currentDate = new Date();
        const CDate = await EventsModel.find({ eventDate: { $gte: currentDate } });
        res.status(200).json({
            message: 'Events retrieved successfully',
            data: CDate
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}


export const PostEvent = async (req, res) => {
    try {
        const { eventName, eventDate, eventTime } = req.body;
        const currentDate = new Date();
        if (new Date(eventDate).getTime() < currentDate.getTime()) {
            throw new Error('Event date cannot be in the past');
        }
        const newEvent = new EventsModel({
            eventName,
            eventDate: new Date(eventDate),
            eventTime
        });
        await newEvent.save();
        res.status(200).json({
            message: 'Event created successfully',
            data: newEvent
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}



export const updateEvent = async (req, res) => {
    try {
        const { eventName, eventDate, eventTime } = req.body;
        const {id} = req.params;
        const currentDate = new Date();
        if (new Date(eventDate).getTime() < currentDate.getTime()) {
            throw new Error('Event date cannot be in the past');
        }
        const event = await EventsModel.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }
        event.eventName = eventName;
        event.eventDate = new Date(eventDate);
        event.eventTime = eventTime;
        await event.save();
        res.status(200).json({
            message: 'Event updated successfully',
            data: event
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}


export const deleteEvent = async (req, res) => {
    try {
        const {id} = req.params;
        await EventsModel.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Event deleted successfully',
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}