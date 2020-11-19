import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';

function InstructorStudentClassCard({
    instructor,
    level,
    name,
    program,
    term,
    onEdit,
    selected,
    onSelected,
}) {
    return (
        <Card
            className={clsx('instructor-student-class-card-container', { 'instructor-student-class-card-selected': selected })}
            elevation={selected ? 1 : 5}
            onClick={onSelected}
        >
            <IconButton
                onClick={onEdit}
                style={{ float: 'right', margin: 5 }}
            >
                <EditIcon />
            </IconButton>
            <CardContent>
                <Typography
                    className='instructor-student-class-card-title'
                    color='textSecondary'
                    gutterBottom
                >
                    Instructor:
                    {' '}
                    {instructor}
                </Typography>
                <Typography
                    className='pt-1 pb-3'
                    component='h2'
                    variant='h5'
                >
                    {name}
                </Typography>
                <Typography
                    className='instructor-student-class-card-pos'
                    color='textSecondary'
                >
                    Level:
                    {' '}
                    {level}
                </Typography>
                <Typography
                    className='instructor-student-class-card-pos'
                    color='textSecondary'
                >
                    Program:
                    {' '}
                    {program}
                </Typography>
                <Typography
                    className='instructor-student-class-card-pos'
                    color='textSecondary'
                >
                    Term:
                    {' '}
                    {term}
                </Typography>
            </CardContent>
        </Card>
    );
}

InstructorStudentClassCard.propTypes = {
    instructor: PropTypes.string,
    level: PropTypes.string,
    name: PropTypes.string,
    program: PropTypes.string,
    term: PropTypes.string,
    onEdit: PropTypes.func,
    selected: PropTypes.bool,
    onSelected: PropTypes.func,
};

InstructorStudentClassCard.defaultProps = {
    instructor: 'Unknown',
    level: 'Unknown',
    name: 'Unknown',
    program: 'Unknown',
    term: 'Unknown',
    onEdit: undefined,
    selected: false,
    onSelected: undefined,
};

export default InstructorStudentClassCard;
