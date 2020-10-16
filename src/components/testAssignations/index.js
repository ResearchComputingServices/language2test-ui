import React from 'react';
import { Layout } from '../common';
import TestAssignationGrid from './Grid';
import { useGridActions } from '../../hooks';

export default function() {
    const actions = useGridActions('testAssignations');

    return (
        <Layout className='my-5'>
            <TestAssignationGrid
                onCreate={actions.onCreate}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
