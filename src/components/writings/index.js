import React from 'react';
import WritingTestGrid from './Grid';
import { Layout } from '../common';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('writings');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <WritingTestGrid
                onCreate={rolesCheckerService.has('create-writing') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('export-writing') ? actions.onExport : undefined}
                onImport={rolesCheckerService.has('import-writing') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
