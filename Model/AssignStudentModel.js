import mongoose from "mongoose"

const AssignStudent = new mongoose.Schema({
    sapID: {
        type: String
    },
    mentorID: {
        type: mongoose.Types.ObjectId,
    },
    assignedStudents: [{
        sapID: {
            type: String
        },
        studentID: {
            type: mongoose.Types.ObjectId,
        },
        department: {
            type: String
        }
    }],
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
});

export const AssignStudentModel = mongoose.model('AssignedStudents', AssignStudent);