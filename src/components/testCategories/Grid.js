import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AdministratorGrid } from '../common';

function TestCategoriesGrid({
    onCreate,
    onExport,
    onRowClick,
}) {
    const format = datum => {
        datum.testType = _.get(datum, 'testType.name');
        return datum;
    };
    return (
        <AdministratorGrid
            entity='testCategories'
            onCreate={onCreate}
            onExport={onExport}
            onRowClick={onRowClick}
            options={{ format }}
            title='Test Categories'
        />
    );
}

TestCategoriesGrid.propTypes = {
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onRowClick: PropTypes.func,
};

TestCategoriesGrid.defaultProps = {
    onCreate: undefined,
    onExport: undefined,
    onRowClick: undefined,
};

export default TestCategoriesGrid;
