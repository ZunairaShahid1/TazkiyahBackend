import { AssignStudentModel } from './../Model/AssignStudentModel';
import mongoose from "mongoose"

export const addStudent = async (req, res) => {
    const { mentorID, studentID } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(mentorID) || !mongoose.Types.ObjectId.isValid(studentID)) throw new Error("Invalid ID")
        const data = await AssignStudentModel.create({ mentorID, studentID });
        res.status(200).json({
            status: "success",
            data
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

export const getStudent = async (req, res) => {
    const { mentorID } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(mentorID)) {
            throw new Error("Invalid Mentor ID");
        }
        const students = await AssignStudentModel.find({ mentorID });
        res.status(200).json({
            status: "success",
            data: students.assignedStudents
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
}
