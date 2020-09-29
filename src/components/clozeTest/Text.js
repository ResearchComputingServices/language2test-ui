import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ children }) => (
    <>
        <span className='cloze-test-text mb-3'>{children}</span>
    </>
);

Text.propTypes = { children: PropTypes.node };

Text.defaultProps = { children: null };

export default Text;
