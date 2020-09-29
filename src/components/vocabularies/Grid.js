import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AdministratorGrid } from '../common';

function VocabulariesGrid({
    onRowClick,
    onCreate,
    onImport,
    onExport,
}) {
    const format = vocabulary => {
        const { options } = vocabulary;
        vocabulary.options = !_.isString(vocabulary.options)
            ? _.reduce(options, (accumulator, option, index) => {
                if (_.eq(index, _.size(options) - 1)) {
                    accumulator += option;
                } else {
                    accumulator += `${option}, `;
                }
                return accumulator;
            }, '')
            : options;
        vocabulary.testCategory = _.get(vocabulary, 'testCategory.name');
        return vocabulary;
    };
    return (
        <AdministratorGrid
            entity='vocabularies'
            onCreate={onCreate}
            onExport={onExport}
            onImport={onImport}
            onRowClick={onRowClick}
            options={{ format }}
            title='Vocabularies'
        />
    );
}

VocabulariesGrid.propTypes = {
    onRowClick: PropTypes.func,
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onImport: PropTypes.func,
};

VocabulariesGrid.defaultProps = {
    onRowClick: undefined,
    onCreate: undefined,
    onImport: undefined,
    onExport: undefined,
};

export default VocabulariesGrid;
