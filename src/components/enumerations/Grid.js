import React from 'react';
import PropTypes from 'prop-types';
import { AdministratorGrid } from '../common';

function EnumerationsGrid({
    onCreate,
    onExport,
    onImport,
    onRowClick,
}) {
    return (
        <AdministratorGrid
            entity='enumerations'
            onCreate={onCreate}
            onExport={onExport}
            onImport={onImport}
            onRowClick={onRowClick}
            title='Enumerations'
        />
    );
}

EnumerationsGrid.propTypes = {
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onImport: PropTypes.func,
    onRowClick: PropTypes.func,
};

EnumerationsGrid.defaultProps = {
    onCreate: null,
    onExport: null,
    onImport: null,
    onRowClick: null,
};

export default EnumerationsGrid;
