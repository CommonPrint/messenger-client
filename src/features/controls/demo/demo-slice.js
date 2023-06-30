import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    chat: "",
    chats: [],
    messages: [],
    usersOnline: [],
    sendFileLoad: false,
}

const demoSlice = createSlice({
    name: '@demo',
    initialState,
    reducers: {
        privateMessage: (state, action) => {
            const payload = action.payload;
            const payloadData = JSON.parse(payload.body);
        
            switch(payload.command) {
                    case "MESSAGE":

                        console.log('Payload message: ', payloadData);

                        // const chatIndex = state.chats.findIndex(chat => chat.id === state.chat.id);
                        const chatIndex = state.chats.findIndex(chat => chat.id === payloadData.chat);

                            if(chatIndex !== -1) {
                                
                                const {id} = payloadData;
                                const messageIndex = state.chats[chatIndex].messages.findIndex(msg => msg.id === id)

                                if(messageIndex === -1) {
                                    console.log('ChatIndex: ', chatIndex);
                                    state.chats[chatIndex].messages.push(payloadData);

                                    if(state.chat !== "") {
                                        state.chat.messages.push(payloadData);
                                    }
                                    // state.messages.push(payloadData);

                                    state.chats[chatIndex].lastMessage = payloadData;
                                }
                                
                            }
                    break;
            }
        },
        privateFile: (state, action) => {
            const payload = action.payload;
            const payloadData = JSON.parse(payload.body);

            if(payload.command === "MESSAGE") {

                console.log('Payload File message: ', payloadData);

                const chatIndex = state.chats.findIndex(chat => chat.id === payloadData.chat);

                if(chatIndex !== -1) {
                    
                    const {id} = payloadData;
                    const messageIndex = state.chats[chatIndex].messages.findIndex(msg => msg.id === id)

                    if(messageIndex === -1) {
                        console.log('ChatIndex: ', chatIndex);
                        state.chats[chatIndex].messages.push(payloadData);

                        if(state.chat !== "") {
                            state.chat.messages.push(payloadData);
                        }

                        state.chats[chatIndex].lastMessage = payloadData;
                    }
                    
                }

            }
            
        },
        messagesUpdate: (state, action) => {
            state.messages = action.payload;
        },
        editMessage: (state, action) => {
            const payload = action.payload;
            const payloadData = JSON.parse(payload.body);
            
            const chatIndex = state.chats.findIndex(chat => chat.id === payloadData.chat);
            
            if(chatIndex !== -1) {

                const {id} = payloadData;
                                
                const messageIndex = state.chats[chatIndex].messages.findIndex(msg => msg.id === id)

                if(messageIndex !== -1) {
                    state.chats[chatIndex].messages[messageIndex] = payloadData;
                    state.chat.messages[messageIndex] = payloadData;

                    state.chats[chatIndex].lastMessage = state.chats[chatIndex].messages[state.chats[chatIndex].messages.length-1];
                }
                
            }
        },
        deleteMessage: (state, action) => {
            const payload = action.payload;
            const payloadData = JSON.parse(payload.body);
            
            const chatIndex = state.chats.findIndex(chat => chat.id === payloadData.chatId);
            
            if(chatIndex !== -1) {

                const {id} = payloadData;
                                
                const messageIndex = state.chats[chatIndex].messages.findIndex(msg => msg.id === id)

                // if(messageIndex === -1) {
                //     state.chats[chatIndex].messages.push(payloadData);
                //     state.chat.messages.push(payloadData);
                //     // state.messages.push(payloadData);

                //     state.chats[chatIndex].lastMessage = payloadData;
                // }

                if(messageIndex !== -1) {
                    state.chats[chatIndex].messages.splice(messageIndex, 1);

                    if(state.chat !== "") {
                        state.chat.messages.splice(messageIndex, 1);
                    }

                    state.chats[chatIndex].lastMessage = state.chats[chatIndex].messages[state.chats[chatIndex].messages.length-1];
                    // state.chat.messages.splice(messageIndex, 1);
                }
                
            }

            // const messageId = action.payload;
            // const messageIndex = state.chat.messages.findIndex(message => message.id === messageId);

        },
        addChat: (state, action) => {
            const {id} = action.payload;
            const chatIndex = state.chats.findIndex(chat => chat.id === id);
            
            if(chatIndex === -1) {
                state.chats.push(action.payload);
                state.messages = action.payload.messages;
                console.log('State last message: ', action.payload);
            }
        },
        selectorChat: (state, action) => {
            const id = action.payload;
            const chatIndex = state.chats.findIndex(chat => chat.id === id);
            
            if(chatIndex !== -1) {
                state.chat = state.chats[chatIndex];
            }
        },
    }
})

export const { addMessage, privateMessage, editMessage, deleteMessage, 
    privateFile,
    addChat, selectorChat,
    messagesUpdate } = demoSlice.actions;

export const demoReducer = demoSlice.reducer;