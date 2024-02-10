import { GoalModel } from "../Model/goalModel.js";



export const setGoal = async (req, res) => {
    const goal = req.body;
    try {
        const data = await GoalModel.create(goal);
        if(data.milestones.length === 0){
            throw new Error("Add at least one Milestone")
        }
        res.status(200).json({
            status: "success",
            data
        })
    }catch (err) {
        res.status(200).json({
            status: "error",
            message: err.message
        })
    }
}

export const getGoals = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await GoalModel.find({setterId: id});
        res.status(200).json({
            status: "success",
            data
        })
    }catch (err) {
        res.status(200).json({
            status: "error",
            message: err.message
        })
    }
}

export const updateGoal = async (req, res) => {
    const goal = req.body;
    const id = req.params.id;
    try {
        const data = await GoalModel.findByIdAndUpdate(id, goal, { new: true });
        res.status(200).json({
            status: "success",
            data
        })
    }catch (err) {
        res.status(200).json({
            status: "error",
            message: err.message
        })
    }
}
export const deleteGoal = async (req, res) => {
    const id = req.params.id;
    try {
        await GoalModel.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
        })
    }catch (err) {
        res.status(200).json({
            status: "error",
            message: err.message
        })
    }
}