import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from '@material-ui/core';
import moment from 'moment';

function Welcome({ name }) {
    return (
        <>
            <div className='welcome-container p-4'>
                <Typography variant='h5'>
                    {`Welcome back, ${name}`}
                </Typography>
                <Typography
                    className='welcome-date'
                    variant='subtitle1'
                >
                    {moment().format('dddd, D MMMM YYYY')}
                </Typography>
            </div>
            <Divider />
        </>
    );
}

Welcome.propTypes = { name: PropTypes.string };

Welcome.defaultProps = { name: 'Anonymous' };

export default Welcome;
