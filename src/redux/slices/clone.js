import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: {} };

export default createSlice({
    name: 'clone',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        reset: state => {
            Object.assign(state, initialState);
        },
    },
});
