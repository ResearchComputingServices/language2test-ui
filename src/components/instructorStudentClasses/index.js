import React from 'react';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useMount, useService, useStore, useActions } from '../../hooks';
import { Ripple } from '../common';
import InstructorStudents from './InstructorStudents';
import StudentClassCard from './StudentClassCard';

const InstructorStudentClasses = () => {
    const {
        pageSize,
        classes,
        page,
        loading,
        noMoreData,
        selectedCardIndex,
        selectedClass,
    } = useStore('instructorDashboard');
    const {
        setLoading,
        setNoMoreData,
        setClasses,
        setPage,
        selectClass,
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

    const getStudents = selectedClass => (
        selectedClass
            ? _.map(selectedClass.studentStudentClass, student => _.omit(student, ['fields', 'roles']))
            : undefined
    );

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
                            classes.map((data, index) => (
                                <StudentClassCard
                                    key={index}
                                    instructor={`${data.instructor.firstName} ${data.instructor.lastName}`}
                                    level={data.level}
                                    name={data.display}
                                    onEdit={event => {
                                        event.stopPropagation();
                                        historyService.go(`/student-classes/student-class/${data.id}`);
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
