import React from 'react';
import FileSaver from 'file-saver';
import UsersGrid from './Grid';
import { Layout } from '../common';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function Users() {
    const actions = useGridActions('users', {
        import: file => {
            const blob = new Blob(
                [file],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
            );
            FileSaver.saveAs(blob, 'user-import-report.xlsx');
        },
    });
    const rolesCheckerService = useRolesCheckerService();
    return (
        <Layout className='my-4'>
            <UsersGrid
                onCreate={rolesCheckerService.has('Administrator') ? actions.onCreate : undefined}
                onExport={rolesCheckerService.has('Administrator') ? actions.onExport : undefined}
                onImport={rolesCheckerService.has('Administrator') ? actions.onImport : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
