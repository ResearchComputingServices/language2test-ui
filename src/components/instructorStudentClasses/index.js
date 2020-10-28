import React, { useState } from 'react';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useMount, useService } from '../../hooks';
import { Ripple } from '../common';
import InstructorStudents from '../instructorStudents';
import StudentClassCard from './StudentClassCard';

const InfiniteScroll = () => {
    const [data, setData] = useState([]);
    const pageSize = 5;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [noMoreData, setNoMoreData] = useState(false);
    const studentClassService = useService('studentClass');

    const fetchData = async () => {
        try {
            setLoading(true);
            const classes = await studentClassService.getInstructorClasses({
                offset: page * pageSize,
                limit: pageSize,
                column: 'id',
                order: 'desc',
            });
            if (_.isEmpty(classes)) {
                setNoMoreData(true);
            }
            setData(!_.isEmpty(data) ? data.concat(classes) : classes);
            setPage(page + 1);
            setLoading(false);
        } catch (err) {}
    };

    useMount(() => {
        fetchData();
    });

    const onScroll = event => {
        const { target } = event;
        const hasReachedBottom = target.scrollHeight - target.scrollTop === target.clientHeight;
        if (hasReachedBottom && data.length > pageSize && !noMoreData) {
            fetchData();
        }
    };

    return (
        <>
            <div className='p-2'>
                <Typography
                    className='pl-2 pb-2'
                    variant='h6'
                >
                    My Classes
                </Typography>
                <div
                    onScroll={onScroll}
                    style={{
                        height: 500,
                        width: 420,
                        overflowY: 'scroll',
                    }}
                >
                    <div className={clsx('infinite-list', { 'infinite-list-center': _.isEmpty(data) })}>
                        {
                            data.map((data, index) => {
                                console.log(data);
                                return (
                                    <StudentClassCard
                                        key={index}
                                        instructor={`${data.instructor.firstName} ${data.instructor.lastName}`}
                                        level={data.level}
                                        name={data.display}
                                        program={data.program}
                                        term={data.term}
                                    />
                                );
                            })
                        }
                        {!loading && _.isEmpty(data) && <p className='text-muted'>You have no classes</p>}
                        {loading && <Ripple className='m-3' />}
                    </div>
                </div>
            </div>
            <div
                className='p-2'
                style={{
                    width: '50%',
                    minWidth: 700,
                }}
            >
                <Typography
                    className='pl-2 pb-3'
                    variant='h6'
                >
                    My Students
                </Typography>
                <div>
                    <InstructorStudents />
                </div>
            </div>
        </>
    );
};

export default InfiniteScroll;
