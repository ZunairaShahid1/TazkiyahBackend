import express from "express"
const uploadRoutes = express.Router()
import multer from 'multer';
import { uploadFile, uploadlink } from "../Controller/uploadController.js";

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
uploadRoutes.post('/:mentorID', upload.single('file'), uploadFile)
uploadRoutes.post('/link/:mentorID', uploadlink)

export default uploadRoutes;