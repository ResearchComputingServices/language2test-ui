import _ from 'lodash';
import store from '../../redux/store';

export default [
    {
        field: 'id',
        title: 'Id',
        disabled: data => !_.isNil(data.id),
        display: data => !_.isNil(data.id),
    },
    {
        field: 'display',
        title: 'Name',
        required: true,
    },
    {
        field: 'term',
        title: 'Term',
    },
    {
        field: 'level',
        title: 'Level',
    },
    {
        field: 'program',
        title: 'Program',
    },
    {
        field: 'instructor',
        title: 'Instructor',
        type: 'api-picklist',
        query: { roles: 'Instructor' },
        defaultValue: () => ({ name: store.getState().userSession.name }),
        disabled: true,
        entity: 'user',
        required: true,
    },
    {
        field: 'studentStudentClass',
        title: 'Students',
        type: 'grid-select',
        entity: 'students',
        required: true,
    },
];
