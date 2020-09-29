import React from 'react';
import { Layout } from '../common';
import ClozesGrid from './Grid';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const authorizationCheckerService = useAuthorizationCheckerService();
    const actions = useGridActions('clozes');

    return (
        <Layout className='my-5'>
            <ClozesGrid
                onCreate={authorizationCheckerService.has('create-cloze') ? actions.onCreate : undefined}
                onExport={authorizationCheckerService.has('export-cloze') ? actions.onExport : undefined}
                onImport={authorizationCheckerService.has('import-cloze') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
