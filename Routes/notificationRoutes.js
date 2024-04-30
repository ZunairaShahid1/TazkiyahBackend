import express from "express"
import { createNotification, getAllNotifications, getAllTarbiyahNotifications } from "../Controller/notificationController.js";

const NotificationRoutes = express.Router()

NotificationRoutes.route('/tarbiyah').get(getAllTarbiyahNotifications)
NotificationRoutes.route('/:id').post(createNotification).get(getAllNotifications)
export default NotificationRoutes;