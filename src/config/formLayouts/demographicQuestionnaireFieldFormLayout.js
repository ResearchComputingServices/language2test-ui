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
        field: 'userFieldType',
        title: 'Type',
        type: 'api-picklist',
        entity: 'userFieldType',
        required: true,
    },
];
