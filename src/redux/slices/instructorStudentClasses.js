import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../globalActions';

const initialState = {
    classes: [],
    pageSize: 5,
    page: 1,
    noMoreData: false,
    selectedCardIndex: null,
    selectedClass: null,
    loading: false,
};

export default createSlice({
    name: 'instructorStudentClasses',
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
        setSelectedCardIndex: (state, action) => {
            state.selectedCardIndex = action.payload;
        },
        setSelectedClass: (state, action) => {
            state.selectedClass = action.payload;
        },
        selectClass: (state, action) => {
            state.selectedCardIndex = action.payload.selectedCardIndex;
            state.selectedClass = action.payload.selectedClass;
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
