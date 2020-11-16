import React from 'react';
import PropTypes from 'prop-types';
import PaginatedList from './PaginatedList';
import { usePagination } from '../../hooks';

function List({
    data,
    pageSize,
    emptyTitle,
    className,
    style,
    renderRow,
    paginationAlignment,
}) {
    const {
        page,
        count,
        setPage,
        data: paginatedData,
    } = usePagination(data, pageSize);

    return (
        <PaginatedList
            className={className}
            count={Math.ceil(count / pageSize) || 1}
            data={paginatedData}
            emptyTitle={emptyTitle}
            onPaginationChange={pageNumber => setPage(pageNumber)}
            page={page}
            paginationAlignment={paginationAlignment}
            renderRow={(data, index) => renderRow(data, index, ((page - 1) * (pageSize)) + index + 1)}
            style={style}
        />
    );
}

List.propTypes = {
    data: PropTypes.array,
    pageSize: PropTypes.number,
    emptyTitle: PropTypes.string,
    renderRow: PropTypes.func.isRequired,
    paginationAlignment: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
};

List.defaultProps = {
    data: [],
    pageSize: 5,
    emptyTitle: undefined,
    className: undefined,
    style: undefined,
    paginationAlignment: 'left',
};

export default List;
