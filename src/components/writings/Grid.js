import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AdministratorGrid } from '../common';

function WritingsGrid({
    onCreate,
    onExport,
    onRowClick,
    onImport,
}) {
    const format = datum => {
        datum.question = _.truncate(datum.question, { length: 80 });
        datum.testCategory = _.get(datum, 'testCategory.name');
        return datum;
    };
    return (
        <AdministratorGrid
            entity='writings'
            onCreate={onCreate}
            onExport={onExport}
            onImport={onImport}
            onRowClick={onRowClick}
            options={{ format }}
            title='Writings'
        />
    );
}

WritingsGrid.propTypes = {
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onImport: PropTypes.func,
    onRowClick: PropTypes.func,
};

WritingsGrid.defaultProps = {
    onRowClick: undefined,
    onCreate: undefined,
    onImport: undefined,
    onExport: undefined,
};

export default WritingsGrid;
