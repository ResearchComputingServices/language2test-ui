import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { Ripple } from '../common';
import { useGridColumns, useService } from '../../hooks';

function InstructorStudents({ data }) {
    const [loading, setLoading] = useState(false);
    const columns = useGridColumns('students');
    const [service, historyService] = useService('instructor', 'history');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 150);
    }, [data]);

    const fetchData = async query => {
        try {
            const { count } = await service.getStudentsCount();
            const fetchQuery = {
                offset: (query.page) * query.pageSize,
                limit: query.pageSize,
                column: _.snakeCase(_.get(query, 'orderBy.field', 'id') || 'id'),
                order: _.get(query, 'orderDirection', 'asc') || 'asc',
            };
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

    return loading
        ? (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 500,
            }}
            >
                <Ripple />
            </div>
        )
        : (
            <MaterialTable
                columns={columns}
                data={!_.isNil(data) && !_.isEmpty(data) ? data : fetchData}
                onRowClick={(event, data) => historyService.go(`/instructor/student/${data.id}`)}
                options={{ search: !!data }}
                style={{ padding: 10 }}
                title='Students'
            />
        );
}

InstructorStudents.propTypes = { data: PropTypes.array };

InstructorStudents.defaultProps = { data: undefined };

export default InstructorStudents;
