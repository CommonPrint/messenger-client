import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import UserDataService from '../services/UserService';

import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";
import axios from "axios";

const initialState = [{
    "authorization": "111",
    "current-userId": ""
}];

const jwt = getToken();


export const authClient = (token) =>
  axios.create({
    baseURL: "http://localhost:6800/api",
    responseType: 'json',
    timeout: 180000,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
});


export const getUser = createAsyncThunk(
    "users/get",
    async (id) => {

        let token = localStorage.getItem('authorization');

        const res = await authClient(token).get(`/users/${id}`)

        return res.data;
    }
)


// export const getUser = createAsyncThunk(
//     "users/get",
//     async (id) => {

//             const res = await UserDataService.get(id);
//             return res.data;

//     }
// )


export const getAllUsers = createAsyncThunk(
    "users/getAll",
    async () => {
        const res = await UserDataService.getAll();

        return res.data;
    }
)


export const getAllUsersByUsername = createAsyncThunk(
    "users/getAllByUsername",
    async (username) => {
        const res = await UserDataService.getAllByUsername(username);

        return res.data;
    }
)


export const createUser = createAsyncThunk(
    "users/create",
    async ({username, email, password}) => {
        const res = await UserDataService.create({username, email, password});

        return res.data;
    }
);


export const loginUser = createAsyncThunk(
    "users/login",
    async ({username, password, online, lastActive}) => {
        const res = await UserDataService.authorize({username, password, online, lastActive});

        return res.data;
    }
);

export const updateOnlineUser = createAsyncThunk(
    "users/online",
    async(id, {online, lastActive}) => {
    const data = {"online": online, "lastActive": lastActive}

        const res = await UserDataService.updateOnline(id, data);

        return res.data;
    }
)


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => 
        {
            loginUser();
            console.log('STATE: ', state);
            console.log('ACTION: ', action);
        },
        // [createUser.fulfilled]: (state, action) => {
        //     state.push(action.payload)
        // },
        // [loginUser.fulfilled]: (state, action) => {
        //     console.log("State: ", state.authorization);
        //     console.log("Action: ", action);

        //     localStorage.setItem('authorization', `${action.payload.token}`);
        //     localStorage.setItem('current-userId', action.payload.id);
            
        //     state.push(action.payload)
        // }
    }
})


const {reducer} = userSlice;

export default reducer;