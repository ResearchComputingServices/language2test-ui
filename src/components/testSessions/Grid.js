import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AdministratorGrid } from '../common';

function TestSessionsGrid({
    onRowClick,
    onExport,
}) {
    const format = datum => {
        datum.testName = _.get(datum, 'test.name');
        datum.userName = _.get(datum, 'user.name');
        datum.startDatetime = moment.utc(datum.startDatetime).local().format('LLLL');
        datum.endDatetime = moment.utc(datum.endDatetime).local().format('LLLL');
        datum.createdDatetime = moment.utc(datum.createdDatetime).local().format('LLLL');
        return datum;
    };
    return (
        <AdministratorGrid
            entity='testSessions'
            onExport={onExport}
            onRowClick={onRowClick}
            options={{ format }}
            title='Test Sessions'
        />
    );
}

TestSessionsGrid.propTypes = {
    onRowClick: PropTypes.func,
    onExport: PropTypes.func,
};

TestSessionsGrid.defaultProps = {
    onRowClick: undefined,
    onExport: undefined,
};

export default TestSessionsGrid;
