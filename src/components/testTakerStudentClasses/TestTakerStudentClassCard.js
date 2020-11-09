import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        width: 400,
        height: 250,
        margin: 10,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: { fontSize: 14 },
    pos: { marginBottom: 12 },
});

function TestTakerStudentClassCard({
    instructor,
    level,
    name,
    program,
    term,
}) {
    const classes = useStyles();

    return (
        <Card
            className={classes.root}
            elevation={4}
        >
            <CardContent>
                <Typography
                    className={classes.title}
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
                    className={classes.pos}
                    color='textSecondary'
                >
                    Level:
                    {' '}
                    {level}
                </Typography>
                <Typography
                    className={classes.pos}
                    color='textSecondary'
                >
                    Program:
                    {' '}
                    {program}
                </Typography>
                <Typography
                    className={classes.pos}
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

TestTakerStudentClassCard.propTypes = {
    instructor: PropTypes.string,
    level: PropTypes.string,
    name: PropTypes.string,
    program: PropTypes.string,
    term: PropTypes.string,
};

TestTakerStudentClassCard.defaultProps = {
    instructor: 'Unknown',
    level: 'Unknown',
    name: 'Unknown',
    program: 'Unknown',
    term: 'Unknown',
    selected: false,
};

export default TestTakerStudentClassCard;
