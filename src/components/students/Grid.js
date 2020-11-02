import React from 'react';
import PropTypes from 'prop-types';
import { AdministratorGrid } from '../common';

function Students({ onRowClick }) {
    const format = datum => {
        delete datum.roles;
        return datum;
    };
    return (
        <AdministratorGrid
            entity='students'
            onRowClick={onRowClick}
            options={{ format }}
            title='Students'
        />
    );
}

Students.propTypes = { onRowClick: PropTypes.func };

Students.defaultProps = { onRowClick: undefined };

export default Students;
