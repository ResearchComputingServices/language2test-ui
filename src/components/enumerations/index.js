import React from 'react';
import { Layout } from '../common';
import EnumerationsGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function Enumerations() {
    const actions = useGridActions('enumerations');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <EnumerationsGrid
                onCreate={rolesCheckerService.has('Administrator') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('Administrator') ? actions.onExport : undefined}
                onImport={rolesCheckerService.has('Administrator') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
