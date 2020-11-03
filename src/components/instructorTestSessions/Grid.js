import _ from 'lodash';
import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { useGridColumns, useService } from '../../hooks';

function InstructorTestSessions({ id, onRowClick }) {
    const columns = useGridColumns('testSessions');
    const service = useService('instructor');

    const fetchData = async query => {
        try {
            // TODO needs to change.
            const { count } = await service.getStudentsCount();
            const fetchQuery = {
                offset: (query.page) * query.pageSize,
                limit: query.pageSize,
                column: _.snakeCase(_.get(query, 'orderBy.field', 'id') || 'id'),
                order: _.get(query, 'orderDirection', 'asc') || 'asc',
            };
            // TODO needs to change.
            const data = await service.getStudents(fetchQuery);
            return {
                data,
                page: query.page,
                totalCount: count,
            };
        } catch (err) {
            return {
                data: [],
                page: 0,
                totalCount: 0,
            };
        }
    };

    return (
        <MaterialTable
            columns={columns}
            data={fetchData}
            onRowClick={onRowClick}
            options={{ search: false }}
            style={{ padding: 10 }}
            title={`Test Sessions - ${id}`}
        />
    );
}

InstructorTestSessions.propTypes = {
    id: PropTypes.number.isRequired,
    onRowClick: PropTypes.func,
};

InstructorTestSessions.defaultProps = { onRowClick: undefined };

export default InstructorTestSessions;
