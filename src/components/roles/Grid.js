import React from 'react';
import PropTypes from 'prop-types';
import { AdministratorGrid } from '../common';

function RolesGrid({
    onCreate,
    onExport,
    onImport,
    onRowClick,
}) {
    return (
        <AdministratorGrid
            entity='roles'
            onCreate={onCreate}
            onExport={onExport}
            onImport={onImport}
            onRowClick={onRowClick}
            title='Roles'
        />
    );
}

RolesGrid.propTypes = {
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onImport: PropTypes.func,
    onRowClick: PropTypes.func,
};

RolesGrid.defaultProps = {
    onCreate: null,
    onExport: null,
    onImport: null,
    onRowClick: null,
};

export default RolesGrid;
