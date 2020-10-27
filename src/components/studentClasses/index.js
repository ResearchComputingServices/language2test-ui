import React from 'react';
import { Layout } from '../common';
import StudentClassesGrid from './Grid';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('studentClasses');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <StudentClassesGrid
                onCreate={rolesCheckerService.has('create-student-class') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('export-student-class') ? actions.onExport : undefined}
                onImport={rolesCheckerService.has('import-student-class') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
