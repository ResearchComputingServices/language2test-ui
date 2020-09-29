import React from 'react';
import { Layout } from '../common';
import EnumerationsGrid from './Grid';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('roles');
    const authorizationCheckerService = useAuthorizationCheckerService();

    return (
        <Layout className='my-5'>
            <EnumerationsGrid
                onCreate={authorizationCheckerService.has('create-role') ? actions.onCreate : undefined}
                onExport={authorizationCheckerService.has('export-role') ? actions.onExport : undefined}
                onImport={authorizationCheckerService.has('import-role') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
