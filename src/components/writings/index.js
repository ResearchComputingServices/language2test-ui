import React from 'react';
import WritingTestGrid from './Grid';
import { Layout } from '../common';
import { useGridActions, useGridButtons } from '../../hooks';

export default function Writings() {
    const rights = {
        create: ['Administrator', 'Test Developer'],
        export: ['Administrator', 'Test Developer', 'Instructor'],
        import: ['Administrator', 'Test Developer'],
    };
    const actions = useGridActions('writings');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <WritingTestGrid {...buttons} />
        </Layout>
    );
}
