import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { logout, resetTestWizardSession } from '../globalActions';

const initialState = {
    questions: [],
    answers: [],
    progressIndex: 0,
    progress: 'not-started',
    loading: false,
    error: false,
    startDatetime: null,
    endDatetime: null,
    startDateTimes: [],
    endDateTimes: [],
    timer: null,
    result: {},
};

export default createSlice({
    name: 'writingTest',
    initialState,
    reducers: {
        addQuestions: (state, action) => {
            state.questions = [...state.questions, ...action.payload];
        },
        setQuestions: (state, action) => {
            state.questions = [...action.payload];
        },
        addAnswers: (state, action) => {
            state.answers = [...state.answers, ...action.payload];
        },
        setAnswers: (state, action) => {
            state.answers = [...action.payload];
        },
        startTest: state => {
            state.progress = 'in-progress';
            state.progressIndex = 0;
            state.startDatetime = new Date().toISOString();
            state.startDateTimes.push(new Date().toISOString());
        },
        endTest: state => {
            state.progress = 'ended';
            state.endDatetime = new Date().toISOString();
            state.endDateTimes.push(new Date().toISOString());
        },
        nextQuestion: (state, action) => {
            state.endDateTimes.push(new Date().toISOString());
            if (!_.isNil(action.payload)) {
                state.answers = [...action.payload];
            }
            state.progressIndex += 1;
            if (state.progressIndex < state.questions.length) {
                state.startDateTimes.push(new Date().toISOString());
            }
        },
        previousQuestion: state => {
            state.progressIndex -= 1;
        },
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
        setTimer: (state, action) => {
            state.timer = action.payload;
        },
        setResult: (state, action) => {
            state.result = action.payload;
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
    },
});
