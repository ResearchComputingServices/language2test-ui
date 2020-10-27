import React from 'react';
import { Layout } from '../common';
import TestCategoriesGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function TestCategories() {
    const actions = useGridActions('testCategories');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <TestCategoriesGrid
                onCreate={rolesCheckerService.has('Administrator') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('Administrator') ? actions.onExport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
