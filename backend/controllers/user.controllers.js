import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req, res) => {
    try {
        const {fullname, email, password} = req.body
        if(!fullname || !email || !password) 
            return res.status(400).json({message: 'All field are required', success:false})
        
        const user = await User.findOne({email})
        if(user) 
            return res.status(401).json({message:'User already with this email', success:false})
        
        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10) // (password,salt)

        // profile photo
        const profilePhoto = 'https://avatar.iran.liara.run/public/boy'
        await User.create({
            fullname,
            email,
            password:hashedPassword,
            profilePhoto
        })

        return res.status(201).json({message: 'Account created successfully', success:true})
    } catch(err) {
        console.log(err);
    }
}

export const login = async(req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password) 
            return res.status(400).json({message: 'All field are required', success:false})
        
        const user = await User.findOne({email})
        if(!user) 
            return res.status(401).json({message:'Incorrect email or password ', success:false})

        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(!isPasswordMatch)
            return res.status(401).json({message:'Incorrect email or password ', success:false})

        // creating token
        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'})
        // For extra security
        return res.status(200).cookie('token', token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            message: `${user.fullname} logged in successfully`,
            user,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const logout = async(req,res) => {
    try {
        return res.status(200).cookie('token', '', {maxAge:0}).json({
            message: 'logged out successfully'
        })
    } catch (err) {
        console.log(err);
    }
}