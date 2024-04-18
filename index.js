import express from "express";
import cors from "cors"
import RegisterationRoutes from "./Routes/registerationRoutes.js";
import GoalRoutes from "./Routes/goalRoutes.js";
import EventRoutes from "./Routes/eventsRoutes.js";
import AssignRoutes from "./Routes/AssignStudentRoutes.js";
import uploadRoutes from "./Routes/uploadRoutes.js";
import SessionAttendenceRoutes from "./Routes/SessionAttendenceRoutes.js";
import NotificationRoutes from "./Routes/notificationRoutes.js";
import { contactModel } from "./Model/contactModel.js";
import { SendEmail } from "./utils/sendEmail.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static('files'))

app.use('/register',RegisterationRoutes)
app.use('/goals',GoalRoutes)
app.use('/events', EventRoutes);
app.use('/assign', AssignRoutes);
app.use('/upload', uploadRoutes);
app.use('/attendence', SessionAttendenceRoutes);
app.use('/notification', NotificationRoutes);
app.post('/contact', async (req, res)=>{
    const { name, email, phone, message } = req.body;
    try{
        await contactModel.create({ name, email, phone, message });
        SendEmail(name, email, phone, message);
        res.status(200).json({ status: 'success' });
    }catch(err){
        res.status(400).json({ status: 'error', message: err.message });
    }
})

export default app;