import React from 'react';
import PropTypes from 'prop-types';

function PermissionDenied({ className, style }) {
    const Block = (
        <span
            aria-labelledby='block'
            role='img'
        >
            🚫
        </span>
    );
    return (
        <div
            className={`my-5 text-center ${className}`}
            style={style}
        >
            {Block}
            403 Permission Denied
            {Block}
        </div>
    );
}

PermissionDenied.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

PermissionDenied.defaultProps = {
    className: '',
    style: undefined,
};

export default PermissionDenied;
