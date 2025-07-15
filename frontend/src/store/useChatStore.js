import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const userChatStore = create((set, get) => ({
  //states - initial
  
  selectedUser: null,
  
  users: [],
  isUserLoading: false,
  //add function to update the states
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.messages);
    } finally {
      set({ isUserLoading: false });
    }
  },

  // original
  isMessageLoading: false,
  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      const allMessages = res.data.messages
      set({ messages: allMessages });
      console.log(res);
      
    } catch (error) {
      toast.error(error.response.data.messages);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  messages: [],
  sendMessage: async (messageData) => {
      const {selectedUser, messages} = get()
      console.log("Sending to selected user:", selectedUser);
      try {
          console.log("Message comes here");

          const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
          console.log(res);

          set({ messages: [...messages, res.data] });
          // toast.success("Message Sent Successfully.")
      } catch (error) {
          toast.error(error.response.data.message)
      }

  },

  subscribeToMessages: ()=> {
    const {selectedUser} = get()
    if(!selectedUser) return

    const socket = useAuthStore.getState().socket

    //optimised this one later- [done]
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: ()=> {
    const socket = useAuthStore.getState().socket
    socket.off("newMessage")
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
