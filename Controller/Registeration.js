import { AssignStudentModel } from '../Model/AssignStudentModel.js';
import { ForgetPasswordModel } from '../Model/ForgetPasswordModel.js';
import { RegisterationModel } from './../Model/registerationModel.js';
import { Resend } from "resend"

const resend = new Resend("re_55SZ9Msc_B795Z4pRmpKaN2pnhTbt1TfT");

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

export const getUserById = async (req, res) => {
    const {id} = req.params;
    try{
        const data = await RegisterationModel.findById(id);
        if(!data) throw new Error('Invalid ID');
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


export const forgetPassword = async (req, res) => {
    const {email} = req.query;
    try{
        const data = await RegisterationModel.findOne({email: email});
        if(!data) throw new Error("Email not Exist")
        const forgetData = await ForgetPasswordModel.findOne({userId: data._id});
        const key = Math.random().toString(36).substring(2, 10); 
        if(!forgetData){
            await ForgetPasswordModel.create({userId: data._id, temporaryKey: key});
        }else{
            forgetData.temporaryKey = key;
            await forgetData.save();
        }
        await resend.emails.send({
            from: 'Forget Password <tazkiyah@ffsboyswah.com>',
            to: `${email}`,
            subject: 'Forget Password',
            html: `<p>Here is the key <strong>${key}</strong>. Please keep it confidential and save.</p>`
        });
        res.status(200).json({
            status: true
        })
    }catch(err){
        console.log(err.message);
        res.status(400).json({
            error: err.message
        })
    }
}

export const verifyForgetPassword = async (req, res) => {
    const {email} = req.query;
    try{
        const data = await RegisterationModel.findOne({email: email});
        const forgetData = await ForgetPasswordModel.findOne({userId: data._id});
        if(forgetData.temporaryKey !== req.params.passKey){
            throw new Error("Invalid Key")
        }
        forgetData.isVerified = true;
        await forgetData.save();
        res.status(200).json({
            status: true
        })
    }catch(err){
        console.log(err.message);
        res.status(400).json({
            error: err.message
        })
    }
}

export const changePassword  = async (req, res) => {
    const {email} = req.query;
    const {password} = req.query;
    try{
        console.log(email)
        const data = await RegisterationModel.findOne({email: email});
        const forgetData = await ForgetPasswordModel.findOne({userId: data._id});
        if(!forgetData.isVerified){
            throw new Error('No Verified');
        }
        data.password = password;
        await data.save();
        res.status(200).json({
            status: true
        })
    }catch(err){
        console.log(err.message);
        res.status(400).json({
            error: err.message
        })
    }
}