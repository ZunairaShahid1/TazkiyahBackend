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
    }]
});

export const AssignStudentModel = mongoose.model('AssignedStudents', AssignStudent);

