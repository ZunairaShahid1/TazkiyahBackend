import { RegisterationModel } from './../Model/registerationModel.js';

export const RegisterUser = async (req, res) => {
    const sapid = req.body.sapid;
    const email = req.body.email;
    const password = req.body.password;
    const isStudent = email.toLowerCase().includes('student');

    try{
        if(!isStudent) throw new Error("Only Students can register")
        if(!sapid || !email || !password) throw new Error('Please Fill All Fields');
        const data = await RegisterationModel.create({sapid, email, password, isStudent});
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