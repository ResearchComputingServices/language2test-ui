import _ from 'lodash';
import React from 'react';
import { Typography, IconButton, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useMount, useService, useStore, useActions } from '../../hooks';
import { Ripple } from '../common';
import StudentClassCard from './TestTakerStudentClassCard';

const TestTakerStudentClasses = () => {
    const {
        pageSize,
        classes,
        page,
        loading,
        noMoreData,
        selectedCardIndex,
    } = useStore('testTakerStudentClasses');

    const {
        setLoading,
        setNoMoreData,
        setClasses,
        setPage,
        reset,
    } = useActions('testTakerStudentClasses');
    const testTakerService = useService('testTaker');

    const fetchData = async reFetch => {
        try {
            if (reFetch) {
                reset();
                setLoading(true);
                const newClasses = await testTakerService.getClasses({
                    offset: 0,
                    limit: pageSize,
                    column: 'id',
                    order: 'desc',
                });
                setClasses(newClasses);
                setPage(2);
                setLoading(false);
                return;
            }
            setLoading(true);
            const newClasses = await testTakerService.getClasses({
                offset: (page - 1) * pageSize,
                limit: pageSize,
                column: 'id',
                order: 'desc',
            });
            if (_.isEmpty(newClasses) || newClasses.length < pageSize) {
                setNoMoreData(true);
            }
            setClasses(!_.isEmpty(classes) ? classes.concat(newClasses) : newClasses);
            setPage(page + 1);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useMount(() => {
        if (_.isEmpty(classes)) {
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
        <>
            <div className='test-taker-student-classes-container'>
                <div className='pl-2 test-taker-student-classes-header'>
                    <Typography variant='h6'> Your Classes </Typography>
                    <Tooltip title='Refresh List'>
                        <IconButton onClick={() => fetchData(true)}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div
                    className={clsx('test-taker-student-classes', { 'test-taker-student-classes-center': _.isEmpty(classes) })}
                    onScroll={onScroll}
                >

                    {
                        classes.map((data, index) => (
                            <StudentClassCard
                                key={index}
                                instructor={`${_.get(data, 'instructor.firstName')} ${_.get(data, 'instructor.lastName')}`}
                                level={_.get(data, 'level')}
                                name={_.get(data, 'display')}
                                program={_.get(data, 'program')}
                                selected={selectedCardIndex === index}
                                term={_.get(data, 'term')}
                            />
                        ))
                    }
                    {!loading && _.isEmpty(classes) && <p className='text-muted'>You are not in any class</p>}
                    {loading && <Ripple className='m-3' />}
                </div>
            </div>
        </>
    );
};

export default TestTakerStudentClasses;
