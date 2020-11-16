import React from 'react';
import PropTypes from 'prop-types';

function NotFound({ className, style }) {
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
            404 Page Not Found
            {Question}
        </div>
    );
}

NotFound.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

NotFound.defaultProps = {
    className: '',
    style: undefined,
};

export default NotFound;
