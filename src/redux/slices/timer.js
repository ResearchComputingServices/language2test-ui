import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { resetTestWizardSession } from '../actions';

const initialState = {
    tick: 0,
    totalTick: 0,
    // A timer will always a timestamp along with every tick, this will allow us to determine how much time was lost when redux store gets rehydrated.
    timestamp: null,
    timerActive: false,
};

export default createSlice({
    name: 'tests',
    initialState,
    reducers: {
        initialize: (state, action) => {
            Object.assign(state, action.payload);
        },
        startTimer: (state, action) => {
            const { tick, timestamp } = state;
            const then = moment(timestamp);
            let secondDiff = 0;
            if (then.isValid()) {
                const now = moment();
                secondDiff = now.diff(then, 'seconds');
                const existingTick = (tick - secondDiff);
                if (existingTick < -1) {
                    state.timerActive = false;
                    state.timestamp = null;
                    state.tick = 0;
                    state.totalTick = 0;
                } else {
                    state.timerActive = true;
                    // We substract the exsting tick when it's valid
                    state.tick = existingTick;
                    state.totalTick = action.payload;
                    state.timestamp = new Date().toISOString();
                }
            } else {
                state.timerActive = true;
                state.tick = action.payload;
                state.totalTick = action.payload;
                state.timestamp = new Date().toISOString();
            }
        },
        endTimer: state => {
            state.timerActive = false;
            state.timestamp = null;
            state.tick = 0;
            state.totalTick = 0;
        },
        clearTimestamp: state => {
            state.timestamp = null;
        },
        setTick: (state, action) => {
            state.tick = action.payload;
            state.timestamp = new Date().toISOString();
        },
        reset: state => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: {
        // We don't need the logout reducer.
        [resetTestWizardSession]: state => {
            Object.assign(state, initialState);
        },
    },
});
