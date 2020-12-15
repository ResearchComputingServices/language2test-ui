import React from 'react';
import { Layout } from '../common';
import TestCategoriesGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function TestCategories() {
    const rights = {
        create: ['Administrator', 'Test Developer'],
        import: ['Administrator', 'Test Developer'],
        export: ['Administrator', 'Test Developer'],
    };
    const actions = useGridActions('testCategories');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <TestCategoriesGrid {...buttons} />
        </Layout>
    );
}
