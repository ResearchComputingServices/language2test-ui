import _ from 'lodash';
import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { useGridColumns, useService } from '../../hooks';

function InstructorStudentClassesGrid({ onRowClick }) {
    const columns = useGridColumns('studentClasses');
    const service = useService('instructor');

    const format = datum => {
        datum.instructor = `${_.get(datum, 'instructor.firstName', '')} ${_.get(datum, 'instructor.lastName', '')}`;
        return datum;
    };

    const fetchData = async query => {
        try {
            const { count } = await service.getClassesCount();
            const fetchQuery = {
                offset: (query.page) * query.pageSize,
                limit: query.pageSize,
                column: _.snakeCase(_.get(query, 'orderBy.field', 'id') || 'id'),
                order: _.get(query, 'orderDirection', 'asc') || 'asc',
            };
            const data = await service.getClasses(fetchQuery);
            return {
                data: data.map(format),
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
            title='Student Classes'
        />
    );
}

InstructorStudentClassesGrid.propTypes = { onRowClick: PropTypes.func };

InstructorStudentClassesGrid.defaultProps = { onRowClick: undefined };

export default InstructorStudentClassesGrid;
