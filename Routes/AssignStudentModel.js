
import express from "express"
import { addStudent, getAllUnAssignedStudents, getMentorDetails, getStudent, removeStudent } from "../Controller/AssignStudentController.js";

const AssignRoutes = express.Router()

AssignRoutes.route('/').get(getMentorDetails).post(addStudent).delete(removeStudent);
AssignRoutes.route('/students/unassigned').get(getAllUnAssignedStudents)
AssignRoutes.route('/:mentorID').get(getStudent)
export default AssignRoutes;