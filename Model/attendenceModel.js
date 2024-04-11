import mongoose from "mongoose"

const AttendeceSchema = new mongoose.Schema({
    mentorId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    dept: {
        enum: ['FC', 'Pharmacy', 'DBD', 'Psychology', ''],
        type: String,
        default: ''
    },
    subDept: {
        enum: ['Software Engineering', 'Computer Science', 'Computer Arts', ''],
        type: String,
        default: ''
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