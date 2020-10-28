import _ from 'lodash';

export default [
    {
        type: 'section',
        className: 'form-row',
        elements: [
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
        ],
    },
];
