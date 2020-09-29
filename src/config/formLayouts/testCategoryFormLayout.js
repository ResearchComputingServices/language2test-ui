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
        title: 'Name',
        disabled: data => !_.isNil(data.id),
        required: true,
    },
    {
        field: 'testType',
        title: 'Type',
        type: 'api-picklist',
        entity: 'testType',
        required: true,
    },
];
