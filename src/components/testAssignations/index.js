import React from 'react';
import { Layout } from '../common';
import TestAssignationGrid from './Grid';
import { useGridActions } from '../../hooks';

export default function TestAssignations() {
    const actions = useGridActions('testAssignations');

    return (
        <Layout className='my-4'>
            <TestAssignationGrid
                onCreate={actions.onCreate}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
