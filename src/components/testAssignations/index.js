import React from 'react';
import { Layout } from '../common';
import TestAssignationGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function TestAssignations() {
    const rights = {
        create: ['Administrator'],
        export: ['Administrator'],
        import: ['Administrator'],
    };
    const actions = useGridActions('testAssignations');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <TestAssignationGrid {...buttons} />
        </Layout>
    );
}
