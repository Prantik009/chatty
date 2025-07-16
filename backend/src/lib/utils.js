import jwt from "jsonwebtoken"
export const generateToken = (userId, res) => {
    //create token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    console.log("Cookies generated");
    

    //increse security for cookie
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, // mili seconds support only
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    //return token
    return token
}