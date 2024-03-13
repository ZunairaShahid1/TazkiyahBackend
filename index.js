import express from "express";
import cors from "cors"
import RegisterationRoutes from "./Routes/registerationRoutes.js";
import GoalRoutes from "./Routes/goalRoutes.js";
import EventRoutes from "./Routes/eventsRoutes.js";
import AssignRoutes from "./Routes/AssignStudentModel.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/register',RegisterationRoutes)
app.use('/goals',GoalRoutes)
app.use('/events', EventRoutes);
app.use('/assign', AssignRoutes);

export default app;