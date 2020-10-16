import React from 'react';
import { Layout } from '../common';
import EnumerationsGrid from './Grid';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('enumerations');
    const authorizationCheckerService = useAuthorizationCheckerService();

    return (
        <Layout className='my-4'>
            <EnumerationsGrid
                onCreate={authorizationCheckerService.has('create-enumeration') ? actions.onCreate : undefined}
                onExport={authorizationCheckerService.has('export-enumeration') ? actions.onExport : undefined}
                onImport={authorizationCheckerService.has('import-enumeration') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
