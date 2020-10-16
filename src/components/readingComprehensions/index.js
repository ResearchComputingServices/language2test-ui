import React from 'react';
import { Layout } from '../common';
import ReadingComprehensionsGrid from './Grid';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const authorizationCheckerService = useAuthorizationCheckerService();
    const actions = useGridActions('readingComprehensions');

    return (
        <Layout className='my-4'>
            <ReadingComprehensionsGrid
                onCreate={authorizationCheckerService.has('create-reading-comprehension') ? actions.onCreate : undefined}
                onExport={authorizationCheckerService.has('export-reading-comprehension') ? actions.onExport : undefined}
                onImport={authorizationCheckerService.has('import-reading-comprehension') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
