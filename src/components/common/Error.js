import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import PermissionDenied from './PermissionDenied';
import BadRequest from './BadRequest';

const ErrorComponent = ({ className, style, error, msg }) => {
    if (_.eq(error, 403)) {
        return <PermissionDenied />;
    }
    if (_.eq(error, 400)) {
        return <BadRequest />;
    }
    return (
        <h5
            className={`text-center my-5 ${className}`}
            style={style}
        >
            {msg}
        </h5>
    );
};

ErrorComponent.propTypes = {
    msg: PropTypes.string,
    error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
    ]),
    className: PropTypes.string,
    style: PropTypes.object,
};

ErrorComponent.defaultProps = {
    msg: 'An unexpected error has occured.',
    error: false,
    className: '',
    style: undefined,
};

export default ErrorComponent;
