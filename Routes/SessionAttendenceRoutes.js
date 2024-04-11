import express from 'express'
import { addSessionAttendence, getAllSessionAttendence, getSessionAttendence } from '../Controller/SessionAttendenceController.js'

const SessionAttendenceRoutes = express.Router()

SessionAttendenceRoutes.route('/').get(getSessionAttendence).post(addSessionAttendence)
SessionAttendenceRoutes.route('/all').get(getAllSessionAttendence)

export default SessionAttendenceRoutes