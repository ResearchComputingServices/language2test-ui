import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { logout } from '../globalActions';

const initialState = {
    id: null,
    name: '',
    firstName: '',
    lastName: '',
    displayName: '',
    roles: [],
    studentId: '',
    firstLanguage: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    fields: [],
    agreeToParticipate: null,
    authenticated: false,
};

const userSessionSlice = createSlice({
    name: 'userSession',
    initialState,
    reducers: {
        login: (state, action) => {
            const { payload: user } = action;
            _.assign(state, {
                id: user.id,
                agreeToParticipate: user.agreeToParticipate,
                studentId: user.studentId,
                firstLanguage: user.firstLanguage,
                email: user.email,
                phone: user.phone,
                address: user.address,
                education: user.education,
                authenticated: true,
                name: user.name,
                firstName: user.firstName,
                lastName: user.lastName,
                displayName: `${user.firstName || ''}${user.firstName ? ` ${user.lastName}` : ` ${user.lastName}`}`,
                fields: user.fields,
                roles: user.roles,
            });
        },
        assignUserSession: (state, action) => {
            const { payload: user } = action;
            _.assign(state, {
                id: user.id,
                agreeToParticipate: user.agreeToParticipate,
                studentId: user.studentId,
                firstLanguage: user.firstLanguage,
                email: user.email,
                phone: user.phone,
                address: user.address,
                education: user.education,
                name: user.name,
                firstName: user.firstName,
                lastName: user.lastName,
                fields: user.fields,
                displayName: `${user.firstName || ''}${user.firstName ? ` ${user.lastName}` : ` ${user.lastName}`}`,
                roles: user.roles,
            });
        },
        reset: state => {
            _.assign(state, initialState);
        },
    },
    extraReducers: {
        [logout]: state => {
            Object.assign(state, initialState);
        },
    },
});

userSessionSlice.initialState = initialState;

export default userSessionSlice;
