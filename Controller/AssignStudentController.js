import mongoose from "mongoose"
import { AssignStudentModel } from './../Model/AssignStudentModel.js';
import { RegisterationModel } from './../Model/registerationModel.js';

export const addStudent = async (req, res) => {
    const { mentorID, studentID, sapid, dept } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(mentorID) || !mongoose.Types.ObjectId.isValid(studentID)) throw new Error("Invalid ID")
        const data = await AssignStudentModel.findOne({ mentorID });
        if (!data) throw new Error("Mentor not found");
        data.assignedStudents.push({
            studentID: studentID,
            sapID: sapid,
            department: dept,
        });
        await data.save();
        const registerationData = await RegisterationModel.findById(studentID);
        registerationData.isAssigned = true;
        await registerationData.save();
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

export const removeStudent = async (req, res) => {
    const { mentorID, sapId } = req.query;
    try {
        if (!mongoose.Types.ObjectId.isValid(mentorID)) {
            throw new Error("Invalid ID");
        }

        const registerationData = await RegisterationModel.findOne({sapid: sapId});
        const mentorData = await AssignStudentModel.findOne({ mentorID });
        if (!mentorData) {
            throw new Error("Mentor not found");
        }
        const studentIndex = mentorData.assignedStudents.findIndex(student => student.sapID === sapId);
        if (studentIndex === -1) {
            throw new Error("Student not found");
        }
        mentorData.assignedStudents.splice(studentIndex, 1);
        await mentorData.save();
        registerationData.isAssigned = false;
        await registerationData.save();

        res.status(200).json({
            status: "success",
            message: "Student removed successfully"
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
};


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

export const getMentorDetails = async (req, res) => {
    try {
        const data = await AssignStudentModel.aggregate([
            {
                $project: {
                    "sapID": 1,
                    "mentorID": 1,
                    "assignedStudents": {
                        $map: {
                            input: "$assignedStudents",
                            as: "student",
                            in: {
                                id: "$$student._id",
                                sapID: "$$student.sapID",
                                department: "$$student.department"
                            }
                        }
                    }
                }
            }
        ]);
        res.status(200).json({
            status: "success",
            data
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
}
export const getAllUnAssignedStudents = async (req, res) => {
    try {
        const data = await RegisterationModel.find({ isStudent: true, isAssigned: false });
        res.status(200).json({
            status: "success",
            data
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
}