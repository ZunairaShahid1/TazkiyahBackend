import { AssignStudentModel } from '../Model/AssignStudentModel.js';
import { RegisterationModel } from './../Model/registerationModel.js';

export const RegisterUser = async (req, res) => {
    const {sapid, email, password, dept, subDept} = req.body;
    const isStudent = email.toLowerCase().includes('student');
    const isManager = email.toLowerCase().includes('manager');
    const isMentor = email.toLowerCase().includes('mentor');
    const isCentralTarbiyah = email.toLowerCase().includes('centraltarbiyah');

    try{
        if(!isStudent && !isManager && !isMentor && !isCentralTarbiyah) throw new Error("You are not allowed to Register")
        if(!sapid || !email || !password) throw new Error('Please Fill All Fields');
        const data = await RegisterationModel.create({sapid, email, password, isStudent, isManager, isMentor, isCentralTarbiyah, dept, subDept});
        if(isMentor){
            await AssignStudentModel.create({mentorID: data._id, sapID: sapid, dept, subDept });
        }
        res.status(200).json({
            status: 'success',
            data
        })

    }catch(err){
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}

export const LoginUser = async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    try{
        if(!email || !password) throw new Error('Please Fill All Fields');
        const data = await RegisterationModel.find({email : email, password: password});
        if(!data) throw new Error('Invalid Credentials');
        res.status(200).json({
            status: 'success',
            data
        })

    }catch(err){
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}