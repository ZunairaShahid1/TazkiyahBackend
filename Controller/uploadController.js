import { MentoringModel } from "../Model/uploadSchema.js"

export const uploadFile = async (req, res) => {
    const {mentorID} = req.params;
    const fileName = req.file.filename;
    const title = req.body.title;
    try {
        await MentoringModel.create({mentorId: mentorID, title: title, pdf: fileName })
        res.status(200).json({
            "status": "success"
        })
    } catch (err) {
        res.status(400).json({
            "status": "failed",
            "messgae": err.message
        })
    }
    console.log(req.file)
}

export const uploadlink = async (req, res) => {
    const {mentorID} = req.params;
    const title = req.body.title;
    const link = req.body.link || '';
    try {
        await MentoringModel.create({mentorId: mentorID, title: title, link: link })
        res.status(200).json({
            "status": "success"
        })
    } catch (err) {
        res.status(400).json({
            "status": "failed",
            "messgae": err.message
        })
    }
}

export const getAllUplaodByMentorID = async (req, res) => {
    const {mentorID} = req.params;
    try {
        const data = await MentoringModel.find({mentorId: mentorID})
        res.status(200).json({
            status: "success",
            data
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            messgae: err.message
        })
    }
}