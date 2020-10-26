import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    enabled: false,
    open: false,
};

export default createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        enable: state => {
            state.enabled = true;
        },
        disable: state => {
            state.enabled = false;
        },
        toggle: state => {
            state.open = !state.open;
        },
        hide: state => {
            state.open = false;
        },
        show: state => {
            state.open = true;
        },
    },
});
