import React from 'react';
import { Layout } from '../common';
import ClozesGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function Clozes() {
    const rolesCheckerService = useRolesCheckerService();
    const actions = useGridActions('clozes');

    return (
        <Layout className='my-4'>
            <ClozesGrid
                onCreate={rolesCheckerService.has(['Administrator', 'Test Developer']) ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has(['Administrator', 'Test Developer', 'Instructor']) ? actions.onExport : undefined}
                onImport={rolesCheckerService.has(['Administrator', 'Test Developer']) ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
