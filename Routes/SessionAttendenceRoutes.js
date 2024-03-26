import express from 'express'
import { addSessionAttendence, getSessionAttendence } from '../Controller/SessionAttendenceController.js'

const SessionAttendenceRoutes = express.Router()

SessionAttendenceRoutes.route('/').get(getSessionAttendence).post(addSessionAttendence)

export default SessionAttendenceRoutes