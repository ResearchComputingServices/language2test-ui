import React from 'react';
import PropTypes from 'prop-types';

function InUse({ msg, show, className, style }) {
    return show
        ? (
            <div
                className={`pb-2 ${className}`}
                style={style}
            >
                <h6 className='field error-text'>
                    <b>
                        <i>
                            {msg}
                        </i>
                    </b>
                </h6>
            </div>
        )
        : null;
}

InUse.propTypes = {
    msg: PropTypes.string,
    show: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
};

InUse.defaultProps = {
    msg: '',
    style: undefined,
    className: '',
    show: false,
};

export default InUse;
