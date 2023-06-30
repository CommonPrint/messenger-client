import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ChatDataService from '../services/ChatService';
import axios from "axios";

const initialState = [];


// Получение всех чатов
export const getAllChats = createAsyncThunk(
    'chats/getAll',
    async () => {
        const res = await ChatDataService.getAll();

        return res.data;
    }
)



// Получение конкретного чата
// export const getChat = createAsyncThunk(
//   'chats/get',
//   async (id) => {
//     const res = await ChatDataService.get(id);

//     return res.data;
//   }
// )



// Получение конкретного чата
export const getChat = createAsyncThunk(
  'chats/get',
  async (id) => {

    let token = localStorage.getItem('authorization');

    const res = await axios.create({
                                baseURL: "http://localhost:6800/api",
                                responseType: 'json',
                                timeout: 180000,
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  'Content-Type': 'application/json',
                                },
                            }).get(`/chats/${id}`);
    
    return res.data;
  }
)



// Создание чата
export const createChat = createAsyncThunk(
    "chats/create",
    async ({name, creatorId, type, users}) => {
        const res = await ChatDataService.create({name, creatorId, type, users});

        return res.data;
    }
);



// Обновление
export const updateChat = createAsyncThunk(
    'chats/update',
    async ({ id, name, userChats, messages }) => {
        const res = await ChatDataService.create({id, name, userChats, messages});

        return res.data;
    }

);



export const deleteChat = createAsyncThunk(
  'chats/delete',
  async (id) => {
    const res = await ChatDataService.remove(id);

    return res.data;
  }
);



export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    extraReducers: {
      [getChat.fulfilled]: (state, { payload }) => {
        state.push(payload)
      },
      [createChat.fulfilled]: (state, { payload }) => {
        console.log('Chat payload', payload);
        state.isFetching = false;
        state.isSuccess = true;
        state.id = payload.chat.id;
        state.name = payload.chat.name;
        state.creator = payload.chat.creator;
        state.type = payload.chat.type;
        state.userChats = payload.chat.userChats;
        state.messages = payload.chat.messages;
      },
      [createChat.pending]: (state) => {
        state.isFetching = true;
      },
      [createChat.rejected]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload?.message;
      },
    },
  });

  
const {reducer} = chatSlice;

export default reducer;