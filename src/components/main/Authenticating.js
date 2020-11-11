import React from 'react';
import PropTypes from 'prop-types';
import { Ripple } from '../common';

const Authenticating = ({ msg }) => (
    <div className='authenticating'>
        <Ripple />
        {msg}
    </div>
);

Authenticating.propTypes = { msg: PropTypes.string };

Authenticating.defaultProps = { msg: 'Processing your request, one moment...' };

export default Authenticating;
