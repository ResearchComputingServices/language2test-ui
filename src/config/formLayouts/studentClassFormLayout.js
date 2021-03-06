import _ from 'lodash';

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
        query: { roles: 'Instructor' },
        type: 'api-picklist',
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
