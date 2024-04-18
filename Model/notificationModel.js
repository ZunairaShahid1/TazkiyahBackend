import mongoose from "mongoose"


const notificationSchema = new mongoose.Schema({
    mentorID: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    notifications: [
        {
            message: {
                type: String,
                require: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})


export const notificationModel = mongoose.model('Notification', notificationSchema);