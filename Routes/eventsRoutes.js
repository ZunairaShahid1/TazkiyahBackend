import express from "express"
import { deleteEvent, GetAllEvents, PostEvent, updateEvent } from "../Controller/eventController.js";

const EventRoutes = express.Router();

EventRoutes.route('/').get(GetAllEvents).post(PostEvent)
EventRoutes.route('/:id').put(updateEvent).delete(deleteEvent)


export default EventRoutes;