import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
    title: '',
    text: '',
    confirmed: false,
    canceled: false,
    key: null,
    loading: false,
};

export default createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        showDialog: (state, action) => {
            _.assign(state, initialState);
            state.open = true;
            state.title = action.payload.title;
            state.text = action.payload.text;
            state.key = action.payload.key || null;
        },
        hideDialog: state => {
            state.open = false;
            state.confirmed = false;
            state.canceled = false;
            state.key = null;
        },
        confirm: state => {
            state.confirmed = true;
        },
        cancel: state => {
            state.open = false;
            state.canceled = true;
        },
        toggleLoading: state => {
            state.loading = !state.loading;
        },
    },
});
