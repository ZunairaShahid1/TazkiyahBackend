import express from "express"
import { GetAllEvents, PostEvent } from "../Controller/eventController.js";

const EventRoutes = express.Router();

EventRoutes.route('/').get(GetAllEvents).post(PostEvent)


export default EventRoutes;