import React from 'react';
import { Button } from '@material-ui/core';

export default [
    {
        field: 'id',
        title: 'Id',
    },
    {
        field: 'name',
        title: 'Name',
    },
    {
        render: rowData => (
            <Button
                color='primary'
                onClick={e => {
                    e.stopPropagation();
                    console.log(rowData);
                }}
            >
                View Test Session
            </Button>
        ),
    },
];
