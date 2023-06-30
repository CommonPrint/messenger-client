import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    search: ''
}


const controlsSlice = createSlice({
    name: '@@controls',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        clearControls: () => initialState
    }
});

export const {setSearch, clearControls} = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;