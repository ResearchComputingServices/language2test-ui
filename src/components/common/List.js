import React from 'react';
import PropTypes from 'prop-types';
import PaginatedList from './PaginatedList';
import { usePagination } from '../../hooks';

function List({ data, pageSize, emptyTitle, renderRow }) {
    const {
        page,
        count,
        setPage,
        data: paginatedData,
    } = usePagination(data, pageSize);

    return (
        <PaginatedList
            count={Math.ceil(count / pageSize) || 1}
            data={paginatedData}
            emptyTitle={emptyTitle}
            onPaginationChange={pageNumber => setPage(pageNumber)}
            page={page}
            renderRow={(data, index) => renderRow(data, index, ((page - 1) * (pageSize)) + index + 1)}
        />
    );
}

List.propTypes = {
    data: PropTypes.array,
    pageSize: PropTypes.number,
    emptyTitle: PropTypes.string,
    renderRow: PropTypes.func.isRequired,
};

List.defaultProps = {
    data: [],
    pageSize: 5,
    emptyTitle: undefined,
};

export default List;
