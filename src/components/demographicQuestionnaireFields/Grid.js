import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AdministratorGrid } from '../common';

function DemographicQuestionnaireFieldsGrid({
    onCreate,
    onExport,
    onRowClick,
}) {
    const format = item => {
        item.userFieldType = _.get(item, 'userFieldType.name');
        return item;
    };
    return (
        <AdministratorGrid
            entity='demographicQuestionnaireFields'
            onCreate={onCreate}
            onExport={onExport}
            onRowClick={onRowClick}
            options={{ format }}
            title='Demographic Fields'
        />
    );
}

DemographicQuestionnaireFieldsGrid.propTypes = {
    onCreate: PropTypes.func,
    onExport: PropTypes.func,
    onRowClick: PropTypes.func,
};

DemographicQuestionnaireFieldsGrid.defaultProps = {
    onCreate: undefined,
    onExport: undefined,
    onRowClick: undefined,
};

export default DemographicQuestionnaireFieldsGrid;
