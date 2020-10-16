import React from 'react';
import PropTypes from 'prop-types';
import { AdministratorGrid } from '../common';

function TestAssignationGrid({
    onCreate,
    onImport,
    onExport,
    onRowClick,
}) {
    const format = datum => datum;
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
