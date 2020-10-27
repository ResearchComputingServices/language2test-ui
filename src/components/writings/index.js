import React from 'react';
import WritingTestGrid from './Grid';
import { Layout } from '../common';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function Writings() {
    const actions = useGridActions('writings');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <WritingTestGrid
                onCreate={rolesCheckerService.has(['Administrator', 'Test Developer']) ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has(['Administrator', 'Test Developer', 'Instructor']) ? actions.onExport : undefined}
                onImport={rolesCheckerService.has(['Administrator', 'Test Developer']) ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
