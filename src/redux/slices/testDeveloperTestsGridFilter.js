import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../globalActions';

const initialState = { gridFilter: null };

export default createSlice({
    name: 'testDeveloperTestsGridFilter',
    initialState,
    reducers: {
        setGridFilter: (state, action) => {
            state.gridFilter = action.payload;
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
