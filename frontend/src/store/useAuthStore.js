import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast"

import {io} from "socket.io-client"
const BASE_URL= 'https://chatty-backend-d78v.onrender.com'

export const useAuthStore = create((set, get)=> ({
    authUser: null,
    
    

    isCheckingAuth: true,
    checkAuth: async ()=> {
        try {
            const res = await axiosInstance.get("/auth/check") // this gives a respose back to set authUser
            set({authUser: res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({authUser:null})
        } finally {
            set({ isCheckingAuth: false})
        }
    },

    isSigningUp: false,
    signUp: async (data)=> {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({authUser: res.data})
            toast.success("Account created successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false})
        }
    },

    isLoggingIn: false,
    login: async (data) => {
        set({isLoggingIn: true})
        try{
            const res = await axiosInstance.post("auth/login", data)
            set({authUser: res.data})
            toast.success("Logged in Successfully")
            get().connectSocket()
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isLoggingIn: false})
        }
    },

    logout: async ()=> {
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser: null})
            toast.success("Logged out successfully")
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    isUpdatingProfile: false,
    updateProfile: async (data) =>{
        set({ isUpdatingProfile: true})

        try {
            //get the update response
            const res = await axiosInstance.put("/auth/update-profile", data)
            //update the user data
            set({authUser: res.data})
            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log("Error in Update Profile :", error);
            toast.error(error.response.data.message)
        }finally{
            set({ isUpdatingProfile: false})
        }
    },
    
    onlineUsers: [],
    socket: null,
    connectSocket: async ()=> { 
        //optimization
        const {authUser} = get()
        if (!authUser || get().socket?.connected) return

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        })
        socket.connect()

        set({socket: socket})

        socket.on("getOnlineUsers", (userIds)=> {
            set({ onlineUsers: userIds})
        })
    }, 

    disconnectSocket: async ()=> {
        if(get().socket?.connected) get().socket.disconnect()
    }
    

}))