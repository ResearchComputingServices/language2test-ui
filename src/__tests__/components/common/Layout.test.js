import React from 'react';
import Layout from '../../../components/common/Layout';
import { createSnapshotTest } from '../../../testUtilities';

it('should match snapshot', createSnapshotTest(Layout, {
    props: {
        loading: true,
        error: false,
    },
    children: <div>Test Child</div>,
}));
