import mongoose from "mongooose"

const AttendeceSchema = new mongoose.Schema({
    eventName: {
        type:String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventAttendece: [
        {
            name: {
                type: String,
                required: true
            },
            SAPID: {
                type: String,
                required: true
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