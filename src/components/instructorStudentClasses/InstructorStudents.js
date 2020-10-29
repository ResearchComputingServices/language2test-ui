import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { useGridColumns, useService } from '../../hooks';

function InstructorStudents({ data }) {
    const columns = useGridColumns('students');
    const historyService = useService('history');
    return (
        <MaterialTable
            columns={columns}
            data={data}
            onRowClick={(event, data) => historyService.go(`/users/user/${data.id}`)}
            style={{ padding: 10 }}
            title='Students'
        />
    );
}

InstructorStudents.propTypes = { data: PropTypes.array };

InstructorStudents.defaultProps = { data: undefined };

export default InstructorStudents;
