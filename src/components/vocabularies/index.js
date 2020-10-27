import React from 'react';
import { Layout } from '../common';
import VocabulariesGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('vocabularies');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <VocabulariesGrid
                onCreate={rolesCheckerService.has('create-vocabulary') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('export-vocabulary') ? actions.onExport : undefined}
                onImport={rolesCheckerService.has('import-vocabulary') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
