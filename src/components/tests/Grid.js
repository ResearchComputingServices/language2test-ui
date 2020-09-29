import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { AdministratorGrid } from '../common';

function TestsGrid({
    onRowClick,
    onCreate,
    onExport,
}) {
    const format = test => {
        const start = moment.utc(test.start).local();
        const end = moment.utc(test.end).local();
        if (!_.isNil(test.start) && start.isValid()) {
            test.start = moment(start).format('LLLL');
        }
        if (!_.isNil(test.end) && end.isValid()) {
            test.end = moment(end).format('LLLL');
        }
        return test;
    };
    return (
        <AdministratorGrid
            entity='tests'
            onCreate={onCreate}
            onExport={onExport}
            onRowClick={onRowClick}
            options={{ format }}
            title='Tests'
        />
    );
}

TestsGrid.propTypes = {
    onRowClick: PropTypes.func,
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
};

TestsGrid.defaultProps = {
    onRowClick: undefined,
    onCreate: undefined,
    onExport: undefined,
};

export default TestsGrid;
