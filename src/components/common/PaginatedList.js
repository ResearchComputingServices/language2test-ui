import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import _ from 'lodash';
import List from '@material-ui/core/List';
import Pagination from '@material-ui/lab/Pagination';
import Spinner from './Spinner';

function PaginatedList({
    className,
    style,
    data,
    onPaginationChange,
    count,
    page,
    loading,
    error,
    renderRow,
    emptyTitle,
    paginationAlignment,
}) {
    const [dataState, setDataState] = useState(data);

    useEffect(() => {
        setDataState(data);
    }, [data]);

    const isEmpty = _.eq(count, 1) && _.isEmpty(data);

    return (
        <div
            className={clsx(
                className, 'paginated-list-container', { 'd-flex justify-content-center align-items-center': loading || error || isEmpty },
            )}
            style={style}
        >
            {loading && <Spinner />}
            {!loading && !error && isEmpty && <div className='text-muted'>{emptyTitle}</div>}
            {!loading && !error && !(isEmpty) && (
                <>
                    <List className='paginated-list'>
                        {_.map(dataState, (datum, index) => <React.Fragment key={index}>{renderRow(datum, index)}</React.Fragment>)}
                    </List>
                    <Pagination
                        className={clsx(
                            'mt-4',
                            {
                                'paginated-list-pagination-left': paginationAlignment === 'left',
                                'paginated-list-pagination-right': paginationAlignment === 'right',
                            },
                        )}
                        color='primary'
                        count={count}
                        onChange={(...args) => {
                            const [, pageNumber] = args;
                            if (_.isFunction(onPaginationChange)) {
                                onPaginationChange(pageNumber);
                            }
                        }}
                        page={page}
                    />
                </>
            )}
            {error && <div className='text-muted'>An error encountered. Please try again.</div>}
        </div>
    );
}

PaginatedList.propTypes = {
    data: PropTypes.array.isRequired,
    onPaginationChange: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    style: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    className: PropTypes.string,
    renderRow: PropTypes.func,
    emptyTitle: PropTypes.string,
    paginationAlignment: PropTypes.string,
};

PaginatedList.defaultProps = {
    loading: false,
    error: false,
    className: '',
    renderRow: _.noop,
    style: undefined,
    emptyTitle: 'List is Empty',
    paginationAlignment: 'left',
};

export default PaginatedList;
