import { createSlice } from '@reduxjs/toolkit';
import { logout, resetTestWizardSession, endTestWizardSession } from '../globalActions';

const initialState = {
    name: null,
    id: null,
    wizardSteps: [],
    startDatetime: null,
    endDatetime: null,
    createDatetime: null,
    loading: false,
    error: false,
    activeStep: 0,
};

export default createSlice({
    name: 'testWizardSession',
    initialState,
    reducers: {
        startTestWizardSession: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.wizardSteps = action.payload.wizardSteps;
            state.startDatetime = new Date().toISOString();
            state.createDatetime = new Date().toISOString();
        },
        validateStep: (state, action) => {
            state.wizardSteps[action.payload].valid = true;
        },
        invalidateStep: (state, action) => {
            state.wizardSteps[action.payload].valid = false;
        },
        startFetch: state => {
            state.loading = true;
            state.error = false;
        },
        endFetch: state => {
            state.loading = false;
        },
        setActiveStep: (state, action) => {
            state.activeStep = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
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
            state.endDatetime = action.payload.endDatetime;
        },
    },
});
