import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { logout, resetTestWizardSession, endTestWizardSession } from '../globalActions';

const initialState = {
    loading: false,
    error: false,
    createdDatetime: null,
    endDatetime: null,
    grade: null,
    id: null,
    maxGrade: null,
    name: null,
    startDatetime: null,
};

export default createSlice({
    name: 'results',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        startFetch: state => {
            state.loading = true;
            state.error = false;
        },
        endFetch: state => {
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        reset: state => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: {
        [logout]: state => {
            Object.assign(state, initialState);
        },
        [resetTestWizardSession]: state => {
            Object.assign(state, initialState);
        },
        [endTestWizardSession]: (state, action) => {
            Object.assign(state, _.pick(action.payload, [
                'createdDatetime',
                'endDatetime',
                'grade',
                'id',
                'maxGrade',
                'name',
                'startDatetime',
            ]));
        },
    },
});
