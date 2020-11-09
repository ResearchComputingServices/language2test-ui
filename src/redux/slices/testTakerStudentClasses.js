import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../globalActions';

const initialState = {
    classes: [],
    pageSize: 5,
    page: 1,
    noMoreData: false,
    loading: false,
};

export default createSlice({
    name: 'testTakerStudentClasses',
    initialState,
    reducers: {
        setClasses: (state, action) => {
            state.classes = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setNoMoreData: (state, action) => {
            state.noMoreData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
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
