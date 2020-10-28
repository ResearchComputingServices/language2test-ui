import React from 'react';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useMount, useService, useStore, useActions } from '../../hooks';
import { Ripple } from '../common';
import InstructorStudents from '../instructorStudents';
import StudentClassCard from './StudentClassCard';

const InstructorStudentClasses = () => {
    const {
        pageSize,
        classes,
        page,
        loading,
        noMoreData,
        selectedCardIndex,
    } = useStore('instructorDashboard');
    const {
        setLoading,
        setNoMoreData,
        setClasses,
        setPage,
        setSelectedCardIndex,
    } = useActions('instructorDashboard');
    const [studentClassService, historyService] = useService('studentClass', 'history');

    const fetchData = async () => {
        try {
            setLoading(true);
            const newClasses = await studentClassService.getInstructorClasses({
                offset: (page - 1) * pageSize,
                limit: pageSize,
                column: 'id',
                order: 'desc',
            });
            if (_.isEmpty(newClasses)) {
                setNoMoreData(true);
            }
            setClasses(!_.isEmpty(classes) ? classes.concat(newClasses) : newClasses);
            setPage(page + 1);
            setLoading(false);
        } catch (err) {}
    };

    useMount(() => {
        if (_.isEmpty(classes)) {
            fetchData();
        }
    });

    const onScroll = event => {
        const { target } = event;
        const hasReachedBottom = target.scrollHeight - target.scrollTop === target.clientHeight;
        if (hasReachedBottom && classes.length > pageSize && !noMoreData) {
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
                    <div className={clsx('infinite-list', { 'infinite-list-center': _.isEmpty(classes) })}>
                        {
                            classes.map((classes, index) => {
                                console.log(classes);
                                return (
                                    <StudentClassCard
                                        key={index}
                                        instructor={`${classes.instructor.firstName} ${classes.instructor.lastName}`}
                                        level={classes.level}
                                        name={classes.display}
                                        onEdit={event => {
                                            event.stopPropagation();
                                            historyService.go(`/student-classes/student-class/${classes.id}`);
                                        }}
                                        onSelected={() => {
                                            if (index === selectedCardIndex) {
                                                setSelectedCardIndex(null);
                                            } else {
                                                setSelectedCardIndex(index);
                                            }
                                        }}
                                        program={classes.program}
                                        selected={selectedCardIndex === index}
                                        term={classes.term}
                                    />
                                );
                            })
                        }
                        {!loading && _.isEmpty(classes) && <p className='text-muted'>You have no classes</p>}
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

export default InstructorStudentClasses;
