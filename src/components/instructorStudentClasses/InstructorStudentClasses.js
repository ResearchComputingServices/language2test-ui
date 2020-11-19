import React from 'react';
import _ from 'lodash';
import { Typography, IconButton, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useMount, useService, useStore, useActions } from '../../hooks';
import { Ripple } from '../common';
import InstructorStudents from './InstructorStudents';
import InstructorStudentClassCard from './InstructorStudentClassCard';

const InstructorStudentClasses = () => {
    const {
        pageSize,
        classes,
        page,
        loading,
        noMoreData,
        selectedCardIndex,
        selectedClass,
    } = useStore('instructorStudentClasses');
    const {
        setLoading,
        setNoMoreData,
        setClasses,
        setPage,
        selectClass,
        reset,
    } = useActions('instructorStudentClasses');
    const [instructorService, historyService] = useService('instructor', 'history');

    const fetchData = async reFetch => {
        try {
            if (reFetch) {
                reset();
                setLoading(true);
                const newClasses = await instructorService.getClasses({
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
            const newClasses = await instructorService.getClasses({
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

    const getStudents = selectedClass => (
        selectedClass
            ? _.map(selectedClass.studentStudentClass, student => _.omit(student, ['fields', 'roles']))
            : undefined
    );

    return (
        <>
            <div className='p-2'>
                <div className='pl-2 instructor-student-classes-header'>
                    <Typography
                        variant='h6'
                    >
                        My Classes
                    </Typography>
                    <Tooltip title='Refresh List'>
                        <IconButton onClick={() => fetchData(true)}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div
                    className='instructor-student-classes-container'
                    onScroll={onScroll}
                >
                    <div className={clsx('instructor-student-classes', { 'instructor-student-classes-center': _.isEmpty(classes) })}>
                        {
                            classes.map((data, index) => (
                                <InstructorStudentClassCard
                                    key={index}
                                    instructor={`${data.instructor.firstName} ${data.instructor.lastName}`}
                                    level={data.level}
                                    name={data.display}
                                    onEdit={event => {
                                        event.stopPropagation();
                                        historyService.go(`/instructor/student-class/${data.id}`);
                                    }}
                                    onSelected={() => {
                                        if (index === selectedCardIndex) {
                                            selectClass({
                                                selectedCardIndex: null,
                                                selectedClass: null,
                                            });
                                        } else {
                                            selectClass({
                                                selectedCardIndex: index,
                                                selectedClass: data,
                                            });
                                        }
                                    }}
                                    program={data.program}
                                    selected={selectedCardIndex === index}
                                    term={data.term}
                                />
                            ))
                        }
                        {!loading && _.isEmpty(classes) && <p className='text-muted'>You have no classes</p>}
                        {loading && <Ripple className='m-3' />}
                    </div>
                </div>
            </div>
            <div className='instructor-students p-2'>
                <Typography
                    className='pl-2 pb-3'
                    variant='h6'
                >
                    {selectedClass ? `Students in ${selectedClass.display}` : 'All Students'}
                </Typography>
                <div>
                    <InstructorStudents data={getStudents(selectedClass)} />
                </div>
            </div>
        </>
    );
};

export default InstructorStudentClasses;
