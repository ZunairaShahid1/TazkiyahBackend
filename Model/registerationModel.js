import mongoose from 'mongoose';

const RegisterationSchema = new mongoose.Schema({
    sapid: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: String,
    isStudent: {
        type: Boolean,
        default: false,
    }, //any-email
    isManager: {
        type: Boolean,
        default: false,
    }, //manager@gmail.com
    isMentor: {
        type: Boolean,
        default: false,
    }, //mentor@gmail.com
    isCentralTarbiyah: {
        type: Boolean,
        default: false,
    }, //tarbiyah@gmail.com
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
    isAssigned: {
        type: Boolean,
        default: false
    },
    mentorId: {
        type: mongoose.Types.ObjectId
    }
})

export const RegisterationModel = mongoose.model("Registeration", RegisterationSchema);