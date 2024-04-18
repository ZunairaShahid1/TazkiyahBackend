import { notificationModel } from './../Model/notificationModel.js';

export const createNotification = async (req, res) => {
    const mentorID = req.params.id;
    const message = req.body.message;
    try {
        const notification = await notificationModel.findOne({ mentorID: mentorID });
        if (!notification) {
            await notificationModel.create({ mentorID: mentorID, notifications: [{ message: message }] });
            res.status(200).json({
                status: "success",
                message: "Notification created successfully"
            });
        } else {
            notification.notifications.unshift({ message: message });
            await notification.save();
            res.status(200).json({
                status: "success",
                message: "Notification created successfully"
            });
        }
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
};

export const getAllNotifications = async (req, res) => {
    const mentorID = req.params.id;
    try {
        const notifications = await notificationModel.findOne({ mentorID: mentorID });
        res.status(200).json({
            status: "success",
            data: notifications
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
};
