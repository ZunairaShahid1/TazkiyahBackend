import express from "express"
import { setGoal, getGoals, updateGoal, deleteGoal, markGoalAsCompleted } from "../Controller/goalController.js";
import { VerifySetterID } from "../Middlewares/goalAuthentication.js";

const GoalRoutes = express.Router()

GoalRoutes.route('/').post(VerifySetterID, setGoal);
GoalRoutes.route('/:id').get(getGoals).patch(updateGoal).delete(deleteGoal);
GoalRoutes.route('/status/:goalId/:userId').patch(markGoalAsCompleted);
export default GoalRoutes;