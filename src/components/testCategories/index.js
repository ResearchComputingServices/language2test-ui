import React from 'react';
import { Layout } from '../common';
import TestCategoriesGrid from './Grid';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('testCategories');
    const authorizationCheckerService = useAuthorizationCheckerService();

    return (
        <Layout className='my-5'>
            <TestCategoriesGrid
                onCreate={authorizationCheckerService.has('create-test-category') ? actions.onCreate : undefined}
                onExport={authorizationCheckerService.has('export-test-category') ? actions.onExport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
