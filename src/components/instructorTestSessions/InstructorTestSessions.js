import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Layout } from '../common';
import InstructorTestSessionsGrid from './Grid';
import { useService } from '../../hooks';

function InstructorTestSessions({ match }) {
    const id = _.get(match, 'params.id');
    const historyService = useService('history');

    return (
        <Layout className='my-4'>
            <div className='administrator-grids'>
                <InstructorTestSessionsGrid
                    id={_.parseInt(id)}
                    onRowClick={(event, data) => historyService.go(`/instructor/test-session/${data.id}`)}
                />
            </div>
        </Layout>
    );
}

InstructorTestSessions.propTypes = { match: PropTypes.object.isRequired };

export default InstructorTestSessions;
