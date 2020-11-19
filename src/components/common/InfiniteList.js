import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Typography, IconButton, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useMount } from '../../hooks';
import { Ripple } from '.';

function InfiniteList({
    title,
    noDataTitle,
    fetch,
    renderRow,
    className,
    style,
    pageSize: propsPageSize,
}) {
    const [pageSize] = useState(propsPageSize);
    const [listData, setListData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [noMoreData, setNoMoreData] = useState(false);

    const reset = () => {
        setListData([]);
        setPage(1);
        setLoading(false);
        setNoMoreData(false);
    };

    const fetchData = async reFetch => {
        try {
            if (reFetch) {
                reset();
                setLoading(true);
                const newListData = await fetch({
                    offset: 0,
                    limit: pageSize,
                    column: 'id',
                    order: 'desc',
                });
                setListData(newListData);
                setPage(2);
                setLoading(false);
                return;
            }
            setLoading(true);
            const newListData = await fetch({
                offset: (page - 1) * pageSize,
                limit: pageSize,
                column: 'id',
                order: 'desc',
            });
            if (_.isEmpty(newListData) || newListData.length < pageSize) {
                setNoMoreData(true);
            }
            setListData(!_.isEmpty(listData) ? listData.concat(newListData) : newListData);
            setPage(page + 1);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useMount(() => {
        if (_.isEmpty(listData)) {
            fetchData();
        }
    });

    const onScroll = event => {
        const { target } = event;
        const hasReachedBottom = target.scrollHeight - target.scrollTop === target.clientHeight;
        if (hasReachedBottom && !noMoreData) {
            fetchData();
        }
    };

    return (
        <div
            className={clsx('p-2', className)}
            style={style}
        >
            <div className='pl-2 infinite-list-header'>
                {title && <Typography variant='h6'>{title}</Typography>}
                <Tooltip title='Refresh List'>
                    <IconButton onClick={() => fetchData(true)}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div
                className='infinite-list-container'
                onScroll={onScroll}
            >
                <div className={clsx('infinite-list', { 'infinite-list-center': _.isEmpty(listData) })}>
                    {listData.map(renderRow)}
                    {!loading && _.isEmpty(listData) && <p className='text-muted'>{noDataTitle}</p>}
                    {loading && <Ripple className='m-3' />}
                </div>
            </div>
        </div>
    );
}

InfiniteList.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    fetch: PropTypes.func.isRequired,
    renderRow: PropTypes.func.isRequired,
    title: PropTypes.string,
    noDataTitle: PropTypes.string,
    pageSize: PropTypes.number,
};

InfiniteList.defaultProps = {
    className: undefined,
    style: undefined,
    title: undefined,
    noDataTitle: 'No data',
    pageSize: 5,
};

export default InfiniteList;
