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
        registerationData.mentorId = mentorID;
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

        const registerationData = await RegisterationModel.findOne({ sapid: sapId });
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
        registerationData.mentorId = '';
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
        const students = await AssignStudentModel.findOne({ mentorID });
        if(!students) throw new Error('No mentor Found');
        res.status(200).json({
            status: "success",
            data: students
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
}

export const getMentorAssigned = async (req, res, next) => {
    try{
        const {manager} = req.params;
        const registerationData = await RegisterationModel.findById(manager);
        req.query.dept = registerationData.dept;
        req.query.subDept = registerationData.subDept;
        next();
    }catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message
        });
    }
}

export const getMentorDetails = async (req, res) => {
    try {
        const { dept, subDept } = req.query;
        const filters = { dept: "", subDept: "" };
        if (dept) filters.dept = dept;
        if (subDept) filters.subDept = subDept;

        const aggregationPipeline = [
            {
                $project: {
                    "sapID": 1,
                    "mentorID": 1,
                    "assignedStudents": {
                        $map: {
                            input: "$assignedStudents",
                            as: "student",
                            in: {
                                id: "$$student.studentsID",
                                sapID: "$$student.sapID",
                                studentsID: "$$student.studentID",
                                department: "$$student.department"
                            }
                        }
                    },
                    "dept": 1,
                    "subDept": 1
                }
            }
        ];

        if (filters.dept !== "") {
            aggregationPipeline.push({
                $match: {
                    $and: [
                        { "dept": filters.dept },
                        { "subDept": filters.subDept }
                    ]
                }
            });
        }

        const data = await AssignStudentModel.aggregate(aggregationPipeline);
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
    const {userId} = req.query;
    try {
        const managerData = await RegisterationModel.findById(userId);
        const data = await RegisterationModel.find({ isStudent: true, isAssigned: false, dept: managerData.dept, subDept: managerData.subDept });
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