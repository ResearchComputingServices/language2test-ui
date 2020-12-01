import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Layout } from '../common';
import TestDeveloperTestSessionsGrid from './Grid';
import { useService } from '../../hooks';

function TestDeveloperTestSessions({ match }) {
    const id = _.get(match, 'params.id');
    const historyService = useService('history');

    return (
        <Layout className='my-4'>
            <div className='administrator-grids'>
                <TestDeveloperTestSessionsGrid
                    id={_.parseInt(id)}
                    onRowClick={(event, data) => historyService.go(`/test-developer/test-session/${data.id}`)}
                />
            </div>
        </Layout>
    );
}

TestDeveloperTestSessions.propTypes = { match: PropTypes.object.isRequired };

export default TestDeveloperTestSessions;
