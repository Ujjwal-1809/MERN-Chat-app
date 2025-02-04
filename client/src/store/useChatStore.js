import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    SelectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
          const res = await axiosInstance.get(`/messages/${userId}`);
          set({ messages: res.data }); 
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isMessagesLoading: false });
        }
      },
sendMessage: async(messageData) => {
const { SelectedUser, messages } = get();

try {
  const res = await axiosInstance.post(`/messages/send/${SelectedUser._id}`, messageData);
  set({ messages: [...messages, res.data] })
} catch (error) {
  toast.error(error.response.data.message);
}
},

subscribeToMessages: () => {
  const { SelectedUser } = get();
  if (!SelectedUser) return;

  const socket = useAuthStore.getState().socket;

  socket.on("newMessage", (newMessage) => {
    const { authUser } = useAuthStore.getState();
    if (newMessage.senderId === authUser?._id) return;  // Don't play sound for sent messages

    const isMessageSentFromSelectedUser = newMessage.senderId === SelectedUser._id;
    if (!isMessageSentFromSelectedUser) return;

    const messageSound = new Audio("/notification.mp3");
    messageSound.play().catch((error) => console.log("Error playing sound:", error));

    set({
      messages: [...get().messages, newMessage],
    });
  });
},


unsubscribeFromMessages: () => {
  const socket = useAuthStore.getState().socket;
  socket.off("newMessage");
},
      setSelectedUser: (SelectedUser) => set({SelectedUser})
})) 