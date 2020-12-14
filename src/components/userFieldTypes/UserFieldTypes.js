import React from 'react';
import UserFieldTypesGrid from './Grid';
import { Layout } from '../common';
import { useGridActions, useGridButtons } from '../../hooks';

export default function UserFieldTypes() {
    const rights = {
        create: ['Administrator', 'Test Developer'],
        export: ['Administrator', 'Test Developer'],
        import: ['Administrator', 'Test Developer'],
    };
    const actions = useGridActions('userFieldTypes');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <UserFieldTypesGrid {...buttons} />
        </Layout>
    );
}
