import React from 'react';
import WritingTestGrid from './Grid';
import { Layout } from '../common';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('writings');
    const authorizationCheckerService = useAuthorizationCheckerService();

    return (
        <Layout className='my-4'>
            <WritingTestGrid
                onCreate={authorizationCheckerService.has('create-writing') ? actions.onCreate : undefined}
                onExport={authorizationCheckerService.has('export-writing') ? actions.onExport : undefined}
                onImport={authorizationCheckerService.has('import-writing') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
