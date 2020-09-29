import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import _ from 'lodash';
import List from '@material-ui/core/List';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import Spinner from './Spinner';

function PaginatedList({
    className,
    data,
    onPaginationChange,
    count,
    page,
    actions,
    loading,
    error,
    renderRow,
    emptyTitle,
}) {
    const [dataState, setDataState] = useState(data);

    useEffect(() => {
        setDataState(data);
    }, [data]);

    const isEmpty = _.eq(count, 1) && _.isEmpty(data);

    return (
        <div className={clsx(
            className, 'paginated-list-container', { 'd-flex justify-content-center align-items-center': loading || error || isEmpty },
        )}
        >
            {loading && <Spinner />}
            {!loading && !error && isEmpty && <div className='text-muted'>{emptyTitle}</div>}
            {!loading && !error && !(isEmpty) && (
                <>
                    <List className='paginated-list'>
                        {_.map(dataState, (datum, index) => renderRow(datum, index))}
                    </List>
                    <div className='paginated-list-actions'>
                        <Pagination
                            className='mt-4'
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
                        <div>
                            {_.map(actions, (action, index) => {
                                const { Icon, onClick, disabled } = action;
                                return (
                                    <IconButton
                                        key={index}
                                        disabled={disabled}
                                        onClick={_.isFunction(onClick) ? () => onClick(data) : _.noop}
                                    >
                                        {Icon}
                                    </IconButton>
                                );
                            })}

                        </div>
                    </div>
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
    actions: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    className: PropTypes.string,
    renderRow: PropTypes.func,
    emptyTitle: PropTypes.string,
};

PaginatedList.defaultProps = {
    actions: [],
    loading: false,
    error: false,
    className: '',
    renderRow: _.noop,
    emptyTitle: 'List is Empty',
};

export default PaginatedList;
