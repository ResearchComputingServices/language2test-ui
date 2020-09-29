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
        required: true,
        disabled: data => !_.isNil(data.id),
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
    {
        field: 'roles',
        type: 'api-picklist-multiple',
        entity: 'roles',
        title: 'Roles',
        required: true,
    },
];
