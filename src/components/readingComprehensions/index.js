import React from 'react';
import { Layout } from '../common';
import ReadingComprehensionsGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function ReadingCOmprehensions() {
    const rolesCheckerService = useRolesCheckerService();
    const actions = useGridActions('readingComprehensions');

    return (
        <Layout className='my-4'>
            <ReadingComprehensionsGrid
                onCreate={rolesCheckerService.has(['Administrator', 'Test Developer']) ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has(['Administrator', 'Test Developer', 'Test Taker']) ? actions.onExport : undefined}
                onImport={rolesCheckerService.has(['Administrator', 'Test Developer']) ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
