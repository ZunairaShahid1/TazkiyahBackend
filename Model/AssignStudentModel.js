import mongoose from "mongoose"

const AssignStudent = new mongoose.Schema({
    sapID: {
        type: String
    },
    mentorID: {
        type: mongoose.Types.ObjectId,
    },
    assignedStudents: [{
        type: mongoose.Types.ObjectId,
        sapID: {
            type: String
        }
    }]
});

export const AssignStudentModel = mongoose.model('AssignedStudents', AssignStudent);

