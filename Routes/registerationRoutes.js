import express from "express"
import { getUserById, LoginUser, RegisterUser } from "../Controller/Registeration.js";

const RegisterationRoutes = express.Router()


RegisterationRoutes.route('/').post(RegisterUser).get(LoginUser)

RegisterationRoutes.route('/:id').get(getUserById)
export default RegisterationRoutes;