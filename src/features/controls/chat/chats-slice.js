import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    chat: "",
    chats: [],
    messages: [],
    privateSubscribeCurrentUser: false
}

const chatsSlice = createSlice({
    name: '@@chats',
    initialState,
    reducers: {
        setPrivateSubscribeCurrentUser: (state, action) => {
            state.setPrivateSubscribeCurrentUser = true;
        },
        addChat: (state, action) => {
            const {id} = action.payload;
            const chatIndex = state.chats.findIndex(chat => chat.id === id);

            if(chatIndex === -1) {
                state.chats.push(action.payload);
            }

        },
        setChat: (state, action) => {
            state.chat = action.payload;
            state.messages = action.payload.messages;
        },
        addMessage: (state, action) => {
            const {id} = action.payload;
            const messageIndex = state.messages.findIndex(message => message.id === id);

            if(messageIndex === -1) {
                state.messages.push(action.payload);
            }
        },
        setMessages: (state, action) => {
            // const {chatId, message} = action.payload;
            state.messages = action.payload;
        },
    }
});

export const {addMessage, addChat, setChat, setMessages, setPrivateSubscribeCurrentUser} = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;