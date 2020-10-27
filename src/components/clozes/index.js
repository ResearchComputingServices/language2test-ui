import React from 'react';
import { Layout } from '../common';
import ClozesGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function() {
    const rolesCheckerService = useRolesCheckerService();
    const actions = useGridActions('clozes');

    return (
        <Layout className='my-4'>
            <ClozesGrid
                onCreate={rolesCheckerService.has('create-cloze') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('export-cloze') ? actions.onExport : undefined}
                onImport={rolesCheckerService.has('import-cloze') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
