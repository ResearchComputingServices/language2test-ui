import React from 'react';
import { Layout } from '../common';
import TestSessionsGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function TestSessions() {
    const actions = useGridActions('testSessions');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <TestSessionsGrid
                onExport={rolesCheckerService.has('Administrator') ? () => actions.onExport('application/zip', 'zip') : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
