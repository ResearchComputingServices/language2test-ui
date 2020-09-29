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
        field: 'enumeration',
        title: 'Enumeration',
        type: 'api-picklist',
        entity: 'enumeration',
    },
];
