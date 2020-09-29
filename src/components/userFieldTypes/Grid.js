import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { AdministratorGrid } from '../common';

function WritingsGrid({
    onCreate,
    onExport,
    onRowClick,
}) {
    const format = datum => {
        datum.enumeration = _.get(datum, 'enumeration.name');
        return datum;
    };
    return (
        <AdministratorGrid
            entity='userFieldTypes'
            onCreate={onCreate}
            onExport={onExport}
            onRowClick={onRowClick}
            options={{ format }}
            title='User Field Types'
        />
    );
}

WritingsGrid.propTypes = {
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onRowClick: PropTypes.func,
};

WritingsGrid.defaultProps = {
    onCreate: undefined,
    onExport: undefined,
    onRowClick: undefined,
};

export default WritingsGrid;
