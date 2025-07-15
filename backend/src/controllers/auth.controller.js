import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res)=> {
    const {fullName, email, password} = req.body
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All Fields are required."})
        }

        if(password.length < 8){
            return res.status(400).json({message: "password must be atleast 8 characters"})
        }
        //Find user by email
        const user = await User.findOne({email})
        //when user already exists
        if (user) return res.status(400).json({ message: "Email already exists"})
        //creating salt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        //after getting all details create a new user
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
        })
        if(newUser){
            // call generate token function
            generateToken(newUser._id, res)
            //saves in db
            await newUser.save()
            //send a sucess message
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }else{
            return res.status(400).json({message: "Invalid Credentials to Signup"}) 
        }

    } catch (error) {
        console.log("Error in Signup Controller " + error.message );
        res.status(500).json({message: "Internal Server Error."})
    }
}

export const login = async (req, res)=> {
    const {email, password} = req.body
    try {
        if(!email || !password){
            return res.status(400).json({ message: "All Fields are required"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ message: "Invalid Credentials"})
        }

        const isPassCorrect = await bcrypt.compare(password, user.password)
        if (!isPassCorrect) return res.status(400).json({ message: "Invalid Credentials"})
        
        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in Login Controller: ", error.message); 
        res.status(500).json({ message: "Internal Server Error"})
    }
}

export const logout = async (req, res)=> {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "Logged Out Successfully"})
    } catch (error) {
        console.log("Error in Logout Controller: ", error.message);
        res.status(200).json({ message: "Internal Server Error"}) 
    }
}

export const updateProfile = async (req, res)=> {
    try {
        const {profilePic} = req.body
        const userId = req.user._id

        if(!profilePic) return res.status(400).json({ message: "Profile Picture is Required"})

        const uploadRespose = await cloudinary.uploader.upload(profilePic)
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadRespose.secure_url}, {new: true})

        res.status(200).json(updateUser)
    } catch (error) {
        console.log("Error in Profile update Controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error"})
    }
} 

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller: ",error.message );
        res.status(500).json({ message: "Internal Server Error"})
    }
}