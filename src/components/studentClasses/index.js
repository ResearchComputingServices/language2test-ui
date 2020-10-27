import React from 'react';
import { Layout } from '../common';
import StudentClassesGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function StudentClasses() {
    const actions = useGridActions('studentClasses');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <StudentClassesGrid
                onCreate={rolesCheckerService.has('Administrator') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('Administrator') ? actions.onExport : undefined}
                onImport={rolesCheckerService.has('Administrator') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
