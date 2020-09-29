import React from 'react';
import UserFieldTypesGrid from './Grid';
import { Layout } from '../common';
import { useGridActions, useAuthorizationCheckerService } from '../../hooks';

export default function() {
    const actions = useGridActions('userFieldTypes');
    const authorizationCheckerService = useAuthorizationCheckerService();

    return (
        <Layout className='my-5'>
            <UserFieldTypesGrid
                onCreate={authorizationCheckerService.has('create-user-field-type') ? actions.onCreate : undefined}
                onRowClick={actions.onRowClick}
            />
        </Layout>
    );
}
