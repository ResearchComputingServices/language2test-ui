import React from 'react';
import { Layout } from '../common';
import EnumerationsGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function Enumerations() {
    const rights = {
        create: ['Administrator', 'Test Developer'],
        export: ['Administrator', 'Test Developer'],
        import: ['Administrator', 'Test Developer'],
    };
    const actions = useGridActions('enumerations');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <EnumerationsGrid {...buttons} />
        </Layout>
    );
}
