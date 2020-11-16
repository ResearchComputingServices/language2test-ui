import React from 'react';
import PropTypes from 'prop-types';

function NotYetImplemented({ style, className }) {
    const Construction = (
        <span
            aria-labelledby='under-construction'
            role='img'
        >
            🚧
        </span>
    );
    return (
        <div
            className={`my-5 text-center ${className}`}
            style={style}
        >
            {Construction}
            {'  '}
            Coming Soon, Implementation in progress
            {'  '}
            {Construction}
        </div>
    );
}

NotYetImplemented.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

NotYetImplemented.defaultProps = {
    className: '',
    style: undefined,
};

export default NotYetImplemented;
