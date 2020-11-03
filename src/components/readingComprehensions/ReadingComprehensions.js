import React from 'react';
import { Layout } from '../common';
import ReadingComprehensionsGrid from './Grid';
import { useGridActions, useGridButtons } from '../../hooks';

export default function ReadingCOmprehensions() {
    const rights = {
        create: ['Administrator', 'Test Developer'],
        export: ['Administrator', 'Test Developer', 'Instructor'],
        import: ['Administrator', 'Test Developer'],
    };
    const actions = useGridActions('readingComprehensions');
    const buttons = useGridButtons(actions, rights);

    return (
        <Layout className='my-4'>
            <ReadingComprehensionsGrid {...buttons} />
        </Layout>
    );
}
