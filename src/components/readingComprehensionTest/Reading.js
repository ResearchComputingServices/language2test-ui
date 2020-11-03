import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '../common';

const Reading = ({
    filename,
    text,
}) => (
    <>
        <p className='reading-comprehension-test-reading mb-3'>{text}</p>
        {filename && <Image imageName={filename} />}
    </>
);

Reading.propTypes = {
    filename: PropTypes.string,
    text: PropTypes.string,
};

Reading.defaultProps = {
    filename: '',
    text: '',
};

export default Reading;
