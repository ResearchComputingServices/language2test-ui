import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AdministratorGrid } from '../common';

function TestSessionsGrid({
    onRowClick,
    onExport,
    onFilter,
    filterApplied,
    tableRef,
    query,
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
            filterApplied={filterApplied}
            onExport={onExport}
            onFilter={onFilter}
            onRowClick={onRowClick}
            options={{ format, query }}
            tableRef={tableRef}
            title='Past Results'
        />
    );
}

TestSessionsGrid.propTypes = {
    onRowClick: PropTypes.func,
    onExport: PropTypes.func,
    onFilter: PropTypes.func,
    filterApplied: PropTypes.bool,
    tableRef: PropTypes.object,
    query: PropTypes.object,
};

TestSessionsGrid.defaultProps = {
    onRowClick: undefined,
    onExport: undefined,
    onFilter: undefined,
    filterApplied: undefined,
    tableRef: undefined,
    query: {},
};

export default TestSessionsGrid;
