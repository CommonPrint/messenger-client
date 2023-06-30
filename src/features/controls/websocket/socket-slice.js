import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    stompUser: ""
}

const socketsSlice = createSlice({
    name: '@@socket',
    initialState,
    reducers: {
        setStomp: (state, action) => {
            state.stompUser = action.payload
        }
    }
});

export const {setStomp} = socketsSlice.actions;
export const socketsReducer = socketsSlice.reducer;