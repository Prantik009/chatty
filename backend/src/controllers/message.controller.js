import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res)=> {
    try {
        //check currentUser - getting becase of protectRoute middleware
        const loggedInUserId = req.user._id
        //get all users details except the currentUser
        const filteredUser = await User.find({ _id: {$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUser)
    } catch (error) {
        console.log("Error in getUsersForSidebar Controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error"})  // updated and improved 
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params; //receiver [any other user]
        const myId = req.user._id // sender [me]

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ],
        })
        res.status(200).json({ messages})
    } catch (error) {
        console.log('Error in getMessages controller: ', error.message);
        res.status(500).json({ error: "Internal Server Error"})
    }
}

export const sendMessage = async (req, res) => {
    try {
        //get the text or/and image
        const {text, image} = req.body // get the content
        const {id:receiverId} = req.params // send user id
        const senderId = req.user._id //my id

        let imageUrl;
        if(image){
            //upload base64 image to coludinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            //update imageUrl with cloudinaryurl
            imageUrl = uploadResponse.secure_url;
        }

        //create the msg to send
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save() // saves msg with imageUrl into db

        //TODO: realtime funcationlity here with -> socket.io
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in SendMessages Controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error"})
    }
}