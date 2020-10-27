import React from 'react';
import UserFieldTypesGrid from './Grid';
import { Layout } from '../common';
import { useGridActions, useRolesCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('userFieldTypes');
    const rolesCheckerService = useRolesCheckerService();

    return (
        <Layout className='my-4'>
            <UserFieldTypesGrid
                onCreate={rolesCheckerService.has('create-user-field-type') ? actions.onCreate : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
