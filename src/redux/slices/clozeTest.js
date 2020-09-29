import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { logout, resetTestWizardSession, endTestWizardSession } from '../actions';

const initialState = {
    questions: [],
    answers: [],
    correctAnswers: [],
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
    name: 'clozeTest',
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
        setCorrectAnswers: (state, action) => {
            state.correctAnswers = action.payload;
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
            const results = _.get(action, 'payload.resultsCloze', []);
            const result = {
                score: 0,
                total: 0,
            };
            _.each(results, answers => {
                _.each(answers.answers, answer => {
                    result.score += answer.answeredCorrectly ? 1 : 0;
                    result.total += 1;
                });
            });
            state.result = result;
        },
    },
});
