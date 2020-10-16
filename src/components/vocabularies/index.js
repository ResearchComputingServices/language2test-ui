import React from 'react';
import { Layout } from '../common';
import VocabulariesGrid from './Grid';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('vocabularies');
    const authorizationCheckerService = useAuthorizationCheckerService();

    return (
        <Layout className='my-4'>
            <VocabulariesGrid
                onCreate={authorizationCheckerService.has('create-vocabulary') ? actions.onCreate : undefined}
                onExport={authorizationCheckerService.has('export-vocabulary') ? actions.onExport : undefined}
                onImport={authorizationCheckerService.has('import-vocabulary') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
