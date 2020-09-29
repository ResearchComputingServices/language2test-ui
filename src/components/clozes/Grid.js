import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AdministratorGrid } from '../common';

function ClozesGrid({
    onCreate,
    onImport,
    onExport,
    onRowClick,
}) {
    const format = cloze => {
        cloze.text = _.truncate(cloze.text, { length: 80 });
        cloze.testCategory = _.get(cloze, 'testCategory.name');
        return cloze;
    };
    return (
        <AdministratorGrid
            entity='clozes'
            importFileTypes={['txt']}
            onCreate={onCreate}
            onExport={onExport}
            onImport={onImport}
            onRowClick={onRowClick}
            options={{ format }}
            title='Clozes'
        />
    );
}

ClozesGrid.propTypes = {
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onRowClick: PropTypes.func,
    onImport: PropTypes.func,
};

ClozesGrid.defaultProps = {
    onCreate: undefined,
    onExport: undefined,
    onRowClick: undefined,
    onImport: undefined,
};

export default ClozesGrid;
