import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import sassTheme from '../root/_theme.scss';

const useStyles = makeStyles({
    root: {
        width: '90%',
        margin: 10,
        display: 'inline-block',
        cursor: 'pointer',
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
    onEdit,
    selected,
    onSelected,
}) {
    const classes = useStyles();

    return (
        <Card
            className={classes.root}
            elevation={selected ? 1 : 5}
            onClick={onSelected}
            style={{ border: selected ? `0.1px solid ${sassTheme.primary}` : 'none' }}
        >
            <IconButton
                onClick={onEdit}
                style={{ float: 'right', margin: 5 }}
            >
                <EditIcon />
            </IconButton>
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
    onEdit: PropTypes.func,
    selected: PropTypes.bool,
    onSelected: PropTypes.func,
};

TestTakerStudentClassCard.defaultProps = {
    instructor: 'Unknown',
    level: 'Unknown',
    name: 'Unknown',
    program: 'Unknown',
    term: 'Unknown',
    onEdit: undefined,
    selected: false,
    onSelected: undefined,
};

export default TestTakerStudentClassCard;
