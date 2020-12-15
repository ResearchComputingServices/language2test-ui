import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AdministratorGrid } from '../common';

function ReadingComprehensionsGrid({
    onCreate,
    onImport,
    onExport,
    onRowClick,
}) {
    const format = readingComprehension => {
        readingComprehension.text = _.truncate(readingComprehension.text, { length: 80 });
        readingComprehension.testCategory = _.get(readingComprehension, 'testCategory.name');
        return readingComprehension;
    };
    return (
        <AdministratorGrid
            entity='readingComprehension'
            importFileTypes={['txt']}
            onCreate={onCreate}
            onExport={onExport}
            onImport={onImport}
            onRowClick={onRowClick}
            options={{ format }}
            title='Readings'
        />
    );
}

ReadingComprehensionsGrid.propTypes = {
    onRowClick: PropTypes.func,
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onImport: PropTypes.func,
};

ReadingComprehensionsGrid.defaultProps = {
    onRowClick: undefined,
    onCreate: undefined,
    onExport: undefined,
    onImport: undefined,
};

export default ReadingComprehensionsGrid;
