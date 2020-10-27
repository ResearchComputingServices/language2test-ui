import React from 'react';
import { Layout } from '../common';
import VocabulariesGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function Vocabularies() {
    const actions = useGridActions('vocabularies');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <VocabulariesGrid
                onCreate={rolesCheckerService.has(['Administrator', 'Test Developer']) ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has(['Administrator', 'Test Developer', 'Instructor']) ? actions.onExport : undefined}
                onImport={rolesCheckerService.has(['Administrator', 'Test Developer']) ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
