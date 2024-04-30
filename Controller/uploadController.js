import { RegisterationModel } from "../Model/registerationModel.js";
import { MentoringModel } from "../Model/uploadSchema.js"
import { addNotification } from "./notificationController.js";

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

export const getAllTarbiyahNotifications = async (req, res) => {
    try {
        const tarbiyahId = await RegisterationModel.findOne({isCentralTarbiyah: true});
        const data = await MentoringModel.find({mentorId: tarbiyahId._id})
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

export const updateReadBy = async (req, res) => {
    try{
        let {materialID, studentID, ownerID} = req.params;
        console.log(materialID, studentID, ownerID)
        const tarbiyahId = await RegisterationModel.findById(studentID);
        const data = await MentoringModel.findById(materialID);
        data.readBy.push(tarbiyahId._id);
        await data.save();

        if(ownerID === 'tarbiyah'){
            ownerID = await RegisterationModel.findOne({isCentralTarbiyah: true});
            ownerID = ownerID._id;
        }else{
            ownerID = tarbiyahId.mentorId;
        }
        await addNotification(`${data.link ? 'Link' : 'File'} ${data.title} is seen by ${tarbiyahId.isStudent ? 'Student' : 'Mentor'} having ${tarbiyahId.sapid} SAPID`, ownerID);
        res.status(200).json({
            status: "success",
            data
        })
    }catch(err){
        console.log(err.message);
        res.status(400).json({
            status: "failed",
            messgae: err.message
        })
    }
}
