import express from "express"
const uploadRoutes = express.Router()
import multer from 'multer';
import { getAllTarbiyahNotifications, getAllUplaodByMentorID, updateReadBy, uploadFile, uploadlink } from "../Controller/uploadController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() +  '-' + file.originalname;
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
uploadRoutes.get('/tarbiyah', getAllTarbiyahNotifications)
uploadRoutes.post('/:mentorID', upload.single('file'), uploadFile)
uploadRoutes.post('/link/:mentorID', uploadlink)
uploadRoutes.get('/:mentorID', getAllUplaodByMentorID)
uploadRoutes.patch('/:materialID/:studentID/:ownerID', updateReadBy)

export default uploadRoutes;