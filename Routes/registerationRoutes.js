import express from "express"
import { LoginUser, RegisterUser } from "../Controller/Registeration.js";

const RegisterationRoutes = express.Router()


RegisterationRoutes.route('/').post(RegisterUser).get(LoginUser)
export default RegisterationRoutes;