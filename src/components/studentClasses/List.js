import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: { minWidth: 275, margin: 10 },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: { fontSize: 14 },
    pos: { marginBottom: 12 },
});

function StudentClassCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.title}
                    color='textSecondary'
                    gutterBottom
                >
                    Instructor: John Doe
                </Typography>
                <Typography
                    component='h2'
                    variant='h5'
                >
                    COMP4107
                </Typography>
                <Typography
                    className={classes.pos}
                    color='textSecondary'
                >
                    Level: 4th Year
                </Typography>
                <Typography
                    className={classes.pos}
                    color='textSecondary'
                >
                    Faculty: Computer Science
                </Typography>
            </CardContent>
        </Card>
    );
}

const InfiniteScroll = () => {
    const [data] = useState([1, 2, 3, 4, 5]);
    return (
        <div
            style={{
                height: 500,
                width: 420,
                overflowY: 'scroll',
            }}
        >
            <div className='post-list'>
                {
                    data.map((_, index) => (
                        <StudentClassCard key={index} />
                    ))
                }
            </div>
        </div>
    );
};

export default InfiniteScroll;
