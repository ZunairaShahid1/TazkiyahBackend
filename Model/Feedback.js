import mongoose from "mongoose"

const FeedbackSchema = new mongoose.Schema({
    SAPID: {
        type: String,
    },
    FeedbackText: {
        type: String,
    },
    materialName: {
        type: String
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
})

export const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);