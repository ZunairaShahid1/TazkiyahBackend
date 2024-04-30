import { RegisterationModel } from '../Model/registerationModel.js';
import { notificationModel } from './../Model/notificationModel.js';

export const createNotification = async (req, res) => {
    const mentorID = req.params.id;
    const message = req.body.message;
    try {
        const notification = await notificationModel.findOne({ mentorID: mentorID });
        if (!notification) {
            await notificationModel.create({ mentorID: mentorID, notifications: [{ message: message }] });
        } else {
            notification.notifications.unshift({ message: message });
            await notification.save();
        }
        const userInfo = await RegisterationModel.findById(mentorID);

        if (userInfo.isCentralTarbiyah) {
            const data = await RegisterationModel.find({ isMentor: true });
            data.forEach(async (item) => {
                const notification = await notificationModel.findOne({ mentorID: item._id });
                if (!notification) {
                    await notificationModel.create({ mentorID: item._id, notifications: [{ message: message }] });
                } else {
                    notification.notifications.unshift({ message: message });
                    await notification.save();
                }
            });
        }else if(userInfo.isMentor){
            const data = await RegisterationModel.find({ mentorId: mentorID });
            data.forEach(async (item) => {
                const notification = await notificationModel.findOne({ mentorID: item._id });
                if (!notification) {
                    await notificationModel.create({ mentorID: item._id, notifications: [{ message: message }] });
                } else {
                    notification.notifications.unshift({ message: message });
                    await notification.save();
                }
            });
        }

        res.status(200).json({
            status: "success",
            message: "Notification created successfully"
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
};

export const getAllNotifications = async (req, res) => {
    const mentorID = req.params.id;
    const data = await notificationModel.findOne({ mentorID: mentorID });
    try {
        res.status(200).json({
            status: "success",
            data
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
};


export const getAllTarbiyahNotifications = async (req, res) => {
    console.log("notifications")
    try {
        const tarbiyahId = await RegisterationModel.findOne({ isCentralTarbiyah: true });
        const data = await notificationModel.findOne({ mentorID: tarbiyahId._id });
        res.status(200).json({
            status: "success",
            data
        })
    } catch (err) {
        res.status(400).json({
            //status: "failed",
            message: err.message // Corrected typo from "messgae" to "message"
        })
    }
}

export const addNotification = async (para, ownerID) => {
    try {
        const notification = await notificationModel.findOne({ mentorID: ownerID });
        notification.notifications.unshift({ message: para });
        await notification.save();
    } catch (err) {
        console.log(err.message);
        return;
    }
}