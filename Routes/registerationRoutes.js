import express from "express"
import { changePassword, changePasswordAndVerify, forgetPassword, getUserById, LoginUser, RegisterUser, verifyForgetPassword } from "../Controller/Registeration.js";

const RegisterationRoutes = express.Router()


RegisterationRoutes.route('/').post(RegisterUser).get(LoginUser)

RegisterationRoutes.route('/forget-password').get(forgetPassword).put(changePasswordAndVerify)

RegisterationRoutes.route('/verify/:passKey').get(verifyForgetPassword)

RegisterationRoutes.route('/password').patch(changePassword)

RegisterationRoutes.route('/:id').get(getUserById)
export default RegisterationRoutes;