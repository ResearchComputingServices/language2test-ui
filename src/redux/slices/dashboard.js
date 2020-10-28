import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../globalActions';

const initialState = { viewAs: null };

export default createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setViewAs: (state, action) => {
            state.viewAs = action.payload;
        },
        reset: state => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: {
        [logout]: state => {
            Object.assign(state, initialState);
        },
    },
});
