import mongoose from "mongoose"

const ForgetPasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    temporaryKey: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

export const ForgetPasswordModel = mongoose.model('ForgetPassword', ForgetPasswordSchema);