import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isNumber } from 'lodash';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function ProgressWatch({ tick, totalTick, anchored, className, style }) {
    const formatDigit = digit => (digit / 10 < 1 ? `0${digit}` : digit);
    const getTimeRemaining = () => {
        if (tick < 0 || !isNumber(tick)) return '∞';
        // Get result of tick / 60.
        const minutes = Math.floor(tick / 60);
        // Get remainder of tick / 60.
        const seconds = Math.floor(tick % 60);
        return `${formatDigit(minutes)}:${formatDigit(seconds)}`;
    };
    const getProgressValue = () => (((totalTick - tick) / totalTick) * 100);
    return (
        <div
            className={`progress-watch ${anchored ? ' progress-watch-anchored' : ''} ${className}`}
            style={style}
        >
            <CircularProgress
                className='progress-watch-spinner'
                value={100 - getProgressValue()}
                variant='static'
            />
            <Box
                alignItems='center'
                bottom={0}
                display='flex'
                justifyContent='center'
                left={0}
                position='absolute'
                right={0}
                top={0}
            >
                <Typography
                    color='textSecondary'
                    component='div'
                    variant='caption'
                >
                    {getTimeRemaining()}
                </Typography>
            </Box>
        </div>
    );
}

ProgressWatch.propTypes = {
    tick: PropTypes.number.isRequired,
    totalTick: PropTypes.number.isRequired,
    anchored: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
};

ProgressWatch.defaultProps = {
    className: '',
    style: undefined,
    anchored: false,
};

export default ProgressWatch;
