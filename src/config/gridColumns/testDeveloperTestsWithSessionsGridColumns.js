import React from 'react';
import { Button } from '@material-ui/core';
import { history } from '../../services';

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
                    history.go(`/test-developer/test-sessions/${rowData.id}`);
                }}
            >
                View Test Session
            </Button>
        ),
    },
];
