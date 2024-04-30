import mongoose from "mongoose"

const UploadSchema = new mongoose.Schema({
    mentorId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    pdf: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    readBy: [
        {
            type: mongoose.Types.ObjectId
        }
    ],
    uploadedDate: {
        type: Date,
        default: Date.now
    },
    link: {
        type: String,
        default: ''
    }
})


export const MentoringModel = mongoose.model('Mentoring', UploadSchema);