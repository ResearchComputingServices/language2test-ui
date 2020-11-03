import React from 'react';
import { Layout } from '../common';
import ClozesGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function Clozes() {
    const rights = {
        create: ['Administrator', 'Test Developer'],
        export: ['Administrator', 'Test Developer', 'Instructor'],
        import: ['Administrator', 'Test Developer'],
    };
    const actions = useGridActions('clozes');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <ClozesGrid {...buttons} />
        </Layout>
    );
}
