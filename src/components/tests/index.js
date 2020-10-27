import React from 'react';
import { Layout } from '../common';
import TestsGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('tests');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <TestsGrid
                onCreate={rolesCheckerService.has('create-test') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('export-test') ? actions.onExport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
