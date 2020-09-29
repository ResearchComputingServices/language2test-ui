import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image';

const Reading = ({
    filename,
    text,
    type,
}) => (
    <>
        {_.eq(type, 'image') && <Image imageName={filename} />}
        {_.eq(type, 'text') && <p className='reading-comprehension-test-reading mb-3'>{text}</p>}
    </>
);

Reading.propTypes = {
    type: PropTypes.string.isRequired,
    filename: PropTypes.string,
    text: PropTypes.string,
};

Reading.defaultProps = {
    filename: '',
    text: '',
};

export default Reading;
