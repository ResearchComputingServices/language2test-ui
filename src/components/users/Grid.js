import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AdministratorGrid } from '../common';

function UsersGrid({
    onRowClick,
    onCreate,
    onImport,
    onExport,
}) {
    const format = datum => {
        datum.roles = _.reduce(datum.roles, (accumulator, role, index) => {
            if (_.eq(_.size(datum.roles) - 1, index)) {
                accumulator += role.name;
            } else {
                accumulator += `${role.name}, `;
            }
            return accumulator;
        }, '');
        return datum;
    };
    return (
        <AdministratorGrid
            entity='users'
            onCreate={onCreate}
            onExport={onExport}
            onImport={onImport}
            onRowClick={onRowClick}
            options={{ format }}
            title='Users'
        />
    );
}

UsersGrid.propTypes = {
    onRowClick: PropTypes.func,
    onCreate: PropTypes.func,
    onImport: PropTypes.func,
    onExport: PropTypes.func,
};

UsersGrid.defaultProps = {
    onRowClick: undefined,
    onCreate: undefined,
    onExport: undefined,
    onImport: undefined,
};

export default UsersGrid;
