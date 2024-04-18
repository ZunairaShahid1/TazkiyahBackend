import express from "express"
import { createNotification, getAllNotifications } from "../Controller/notificationController.js";

const NotificationRoutes = express.Router()

NotificationRoutes.route('/:id').post(createNotification).get(getAllNotifications)
export default NotificationRoutes;