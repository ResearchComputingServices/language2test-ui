import React from 'react';
import PropTypes from 'prop-types';

function InUse({ msg, show }) {
    return show
        ? (
            <div className='pb-2'>
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
    msg: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
};

export default InUse;
