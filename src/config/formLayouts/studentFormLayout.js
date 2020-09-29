import _ from 'lodash';

export default [
    {
        field: 'id',
        title: 'Id',
        disabled: data => !_.isNil(data.id),
        display: data => !_.isNil(data.id),
    },
    {
        field: 'name',
        title: 'Username',
        disabled: data => !_.isNil(data.id),
        required: true,
    },
    {
        field: 'firstName',
        title: 'First Name',
        required: true,
    },
    {
        field: 'lastName',
        title: 'Last Name',
        required: true,
    },
];
