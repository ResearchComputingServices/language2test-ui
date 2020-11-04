import _ from 'lodash';
import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useGridColumns, useService } from '../../hooks';

function InstructorTestSessions({ id, onRowClick }) {
    const columns = useGridColumns('testSessions');
    const service = useService('instructor');

    const format = datum => {
        datum.testName = _.get(datum, 'test.name');
        datum.userName = _.get(datum, 'user.name');
        datum.startDatetime = moment.utc(datum.startDatetime).local().format('LLLL');
        datum.endDatetime = moment.utc(datum.endDatetime).local().format('LLLL');
        datum.createdDatetime = moment.utc(datum.createdDatetime).local().format('LLLL');
        return datum;
    };

    const fetchData = async query => {
        try {
            const { count } = await service.getTestSessionsCount(id);
            const fetchQuery = {
                offset: (query.page) * query.pageSize,
                limit: query.pageSize,
                column: _.snakeCase(_.get(query, 'orderBy.field', 'id') || 'id'),
                order: _.get(query, 'orderDirection', 'asc') || 'asc',
            };
            const data = await service.getTestSessions(id, fetchQuery);
            return {
                data: _.map(data, format),
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
