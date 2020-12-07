import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../globalActions';

const initialState = { filters: {} };

export default createSlice({
    name: 'testSessions',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
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
