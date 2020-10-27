import React from 'react';
import { Layout } from '../common';
import ReadingComprehensionsGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function() {
    const rolesCheckerService = useRolesCheckerService();
    const actions = useGridActions('readingComprehensions');

    return (
        <Layout className='my-4'>
            <ReadingComprehensionsGrid
                onCreate={rolesCheckerService.has('create-reading-comprehension') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('export-reading-comprehension') ? actions.onExport : undefined}
                onImport={rolesCheckerService.has('import-reading-comprehension') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
