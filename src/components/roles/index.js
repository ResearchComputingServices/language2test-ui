import React from 'react';
import { Layout } from '../common';
import EnumerationsGrid from './Grid';
import { useGridActions } from '../../hooks';

export default function Roles() {
    const actions = useGridActions('roles');

    return (
        <Layout className='my-4'>
            <EnumerationsGrid onRowClick={actions.onRowClick} />
        </Layout>
    );
}
