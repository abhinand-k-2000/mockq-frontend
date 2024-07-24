import { createSlice } from "@reduxjs/toolkit";

interface Chat {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: string[];
    latestMessage: string
}

interface ChatState {
    chats: Chat[];
    selectedChat: Chat | null;
}

const initialState: ChatState = {
    chats: [],
    selectedChat: null
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChats(state, action) {
            state.chats = action.payload
        },
        setSelectedChat(state, action) {
            state.selectedChat = action.payload
        }
    }
})



export const {setChats, setSelectedChat} = chatSlice.actions

export default chatSlice.reducer;