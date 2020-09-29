import _ from 'lodash';

export default [
    {
        field: 'id',
        title: 'Id',
        size: 'medium',
        disabled: data => !_.isNil(data.id),
        display: data => !_.isNil(data.id),
    },
    {
        field: 'name',
        title: 'Name',
        size: 'medium',
        disabled: data => !_.isNil(data.id),
        required: true,
    },
];
