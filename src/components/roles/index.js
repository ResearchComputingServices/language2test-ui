import React from 'react';
import { Layout } from '../common';
import EnumerationsGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('roles');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <EnumerationsGrid
                onExport={rolesCheckerService.has('export-role') ? actions.onExport : undefined}
                onImport={rolesCheckerService.has('import-role') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
