import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AdministratorGrid } from '../common';

function StudentClassesGrid({
    onCreate,
    onImport,
    onExport,
    onRowClick,
}) {
    const format = datum => {
        datum.instructor = `${_.get(datum, 'instructor.firstName', '')} ${_.get(datum, 'instructor.lastName', '')}`;
        return datum;
    };
    return (
        <AdministratorGrid
            entity='studentClasses'
            onCreate={onCreate}
            onExport={onExport}
            onImport={onImport}
            onRowClick={onRowClick}
            options={{ format }}
            title='Student Classes'
        />
    );
}

StudentClassesGrid.propTypes = {
    onRowClick: PropTypes.func,
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onImport: PropTypes.func,
};

StudentClassesGrid.defaultProps = {
    onRowClick: undefined,
    onCreate: undefined,
    onExport: undefined,
    onImport: undefined,
};

export default StudentClassesGrid;
