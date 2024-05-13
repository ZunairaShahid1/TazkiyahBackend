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

import { GoalModel } from "./Model/goalModel.js";
import { RegisterationModel } from "./Model/registerationModel.js";
import { Resend } from "resend";

const resend = new Resend("re_55SZ9Msc_B795Z4pRmpKaN2pnhTbt1TfT");
const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static('files'))

app.use('/register', RegisterationRoutes)
app.use('/goals', GoalRoutes)
app.use('/events', EventRoutes);
app.use('/assign', AssignRoutes);
app.use('/upload', uploadRoutes);
app.use('/attendence', SessionAttendenceRoutes);
app.use('/notification', NotificationRoutes);
app.get('/performanceAnalytics/:id', async (req, res) => {
    const userId = req.params.id;
    const currentDatePlus24Hours = new Date();
    try {
        currentDatePlus24Hours.setDate(currentDatePlus24Hours.getDate() + 1);
        const goals = await GoalModel.find({ setterId: userId, goalStatus: { $nin: ['Completed', 'Not Completed'] } });
        goals.map(async (Items) => {
            if (new Date(Items.endDate) < currentDatePlus24Hours) {
                await GoalModel.findByIdAndUpdate(Items._id, { goalStatus: "Not Completed" });
                await RegisterationModel.findByIdAndUpdate(userId, { $inc: { pendingGoals: -1, notCompletedGoals: 1 } });
            }
        })
        const data = await RegisterationModel.findById(userId);
        res.status(200).json(data);
    }catch(err){
        res.status(400).json({ status: 'error', message: err.message });
    }
})
app.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
        await contactModel.create({ name, email, phone, message });
        await resend.emails.send({
            from: 'Forget Password <tazkiyah@ffsboyswah.com>',
            to: `tazkiyahriphah56@gmail.com`,
            subject: 'Forget Password',
            html: `Here is the Message Recieved. <br><br> Name: ${name} <br> Email: ${email}<br> Phone: ${phone}<br> Message: ${message}<br><br>`
        });
        res.status(200).json({ status: 'success' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
})

export default app;