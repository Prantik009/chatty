import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        console.log("JWT Received:", token); // 👈 Add this
        if (!token) return res.status(401).json({ message: "Unauthorised - No Token Provided"})
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) return res.status(401).json({ message: "Unauthorised - Invalid Token"})

        const user = await User.findById(decode.userId).select("-password")

        if(!user) return res.status(404).json({ message: "User not Found"})

        req.user = user

        next()
    } catch (error) {
        console.log("Error in Production Middleware ", error.message);
        res.status(500).json({ message: "Internal Error"})
    }
}