import React from 'react';
import { Layout } from '../common';
import EnumerationsGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('enumerations');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <EnumerationsGrid
                onCreate={rolesCheckerService.has('create-enumeration') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('export-enumeration') ? actions.onExport : undefined}
                onImport={rolesCheckerService.has('import-enumeration') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
