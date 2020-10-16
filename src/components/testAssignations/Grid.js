import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AdministratorGrid } from '../common';

function TestAssignationGrid({
    onCreate,
    onImport,
    onExport,
    onRowClick,
}) {
    const format = datum => {
        datum.test = _.get(datum, 'test.name');
        datum.studentClass = _.map(datum.studentClass, stuClass => stuClass.display);
        datum.studentClass = datum.studentClass.join(',');
        datum.startDatetime = moment.utc(datum.startDatetime).local().format('LLLL');
        datum.endDatetime = moment.utc(datum.endDatetime).local().format('LLLL');
        return datum;
    };
    return (
        <AdministratorGrid
            entity='testAssignation'
            onCreate={onCreate}
            onExport={onExport}
            onImport={onImport}
            onRowClick={onRowClick}
            options={{ format }}
            title='Test Assignation'
        />
    );
}

TestAssignationGrid.propTypes = {
    onRowClick: PropTypes.func,
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onImport: PropTypes.func,
};

TestAssignationGrid.defaultProps = {
    onRowClick: undefined,
    onCreate: undefined,
    onExport: undefined,
    onImport: undefined,
};

export default TestAssignationGrid;
