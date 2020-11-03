import React from 'react';
import { Layout } from '../common';
import TestsGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function Tests() {
    const actions = useGridActions('tests');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <TestsGrid
                onCreate={rolesCheckerService.has(['Administrator', 'Test Developer']) ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has(['Administrator', 'Test Developer']) ? actions.onExport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
