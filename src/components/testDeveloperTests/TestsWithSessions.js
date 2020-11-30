import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { useGridColumns, useService } from '../../hooks';

function TestsWithSessions({ data }) {
    const [loading, setLoading] = useState(false);
    const columns = useGridColumns('testsWithSessions');
    const [service, historyService] = useService('testDeveloper', 'history');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 150);
    }, [data]);

    const fetchData = async query => {
        try {
            const { count } = await service.getTestsWithSessionsCount();
            const fetchQuery = {
                offset: (query.page) * query.pageSize,
                limit: query.pageSize,
                column: _.snakeCase(_.get(query, 'orderBy.field', 'id') || 'id'),
                order: _.get(query, 'orderDirection', 'asc') || 'asc',
            };
            const data = await service.getTestsWithSessions(fetchQuery);
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
            data={!_.isNil(data) && !_.isEmpty(data) ? data : fetchData}
            loading={loading}
            onRowClick={(event, data) => historyService.go(`/test-developer/test/${data.id}`)}
            options={{ search: !!data }}
            style={{ padding: 10 }}
            title='Tests With Sessions'
        />
    );
}

TestsWithSessions.propTypes = { data: PropTypes.array };

TestsWithSessions.defaultProps = { data: undefined };

export default TestsWithSessions;
