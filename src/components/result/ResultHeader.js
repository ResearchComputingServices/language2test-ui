import React from 'react';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';

const ResultHeader = ({ title, marks, className, size }) => (
    <div className={`${className} result-header title-${size}`}>
        <h3><u>{title}</u></h3>
        {marks && (
            <Chip
                className='result-header-chip'
                color='primary'
                label={marks}
                variant='outlined'
            />
        )}
    </div>
);

ResultHeader.propTypes = {
    title: PropTypes.string.isRequired,
    marks: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
};

ResultHeader.defaultProps = {
    className: '',
    marks: '',
    size: 'large',
};

export default ResultHeader;
