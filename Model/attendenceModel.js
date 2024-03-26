import mongoose from "mongoose"

const AttendeceSchema = new mongoose.Schema({
    mentorId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    eventName: {
        type:String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventAttendence: [
        {
            sapID: {
                type: String,
                required: true
            },
            studentID: {
                type: String,
                required: true
            },
            department: {
                type: String
            },
            status: {
                type: String,
                enum: ['Present', 'Absent'],
                default: 'Present'
            }
        }
    ]
})


export const AttendenceModel = mongoose.model('sessionAttendence', AttendeceSchema);