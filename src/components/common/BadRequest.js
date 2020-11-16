import React from 'react';
import PropTypes from 'prop-types';

function BadRequest({ style, className }) {
    const Question = (
        <span
            aria-labelledby='question'
            role='img'
        >
            ❓
        </span>
    );
    return (
        <div
            className={`my-5 text-center ${className}`}
            style={style}
        >
            {Question}
            400 Bad Request
            {Question}
        </div>
    );
}

BadRequest.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
};

BadRequest.defaultProps = {
    style: {},
    className: '',
};

export default BadRequest;
