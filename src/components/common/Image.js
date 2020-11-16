import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Layout } from '.';
import { useData, useService } from '../../hooks';

function Image({ imageName, className, style }) {
    const fileService = useService('file');
    const [image, setImage] = useState(null);

    const [loading] = useData(async () => {
        if (!_.isEmpty(imageName) && !_.isNil(imageName)) {
            const downloadedImage = await fileService.download(imageName);
            setImage(URL.createObjectURL(downloadedImage.data));
        }
    }, [imageName]);

    return (
        <Layout
            className={className}
            loading={loading}
            style={style}
        >
            <img
                alt={imageName}
                className='scale-down'
                src={image}
            />
        </Layout>
    );
}

Image.propTypes = {
    imageName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
};

Image.defaultProps = {
    imageName: '',
    className: undefined,
    style: undefined,
};

export default Image;
