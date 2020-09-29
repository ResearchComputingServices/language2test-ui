import React from 'react';
import PropTypes from 'prop-types';

const RawField = ({ content }) => <div className='w-90'>{content}</div>;

RawField.propTypes = { content: PropTypes.node.isRequired };

export default RawField;
