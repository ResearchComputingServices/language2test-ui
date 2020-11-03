import React from 'react';
import { Layout } from '../common';
import TestCategoriesGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function TestCategories() {
    const rights = {
        create: ['Administrator'],
        export: ['Administrator'],
        import: ['Administrator'],
    };
    const actions = useGridActions('testCategories');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <TestCategoriesGrid {...buttons} />
        </Layout>
    );
}
