import _ from 'lodash';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import Image from '../image';

const Question = ({
    children,
    text,
    filename,
}) => (
    <>
        {!_.isNil(children)
            && (
                <>
                    <div className='writing-test-question-title-image'>
                        <Image imageName={filename} />
                    </div>
                    <div className='writing-test-question-title-text'>
                        {text}
                    </div>
                    <Divider
                        className='mt-2 mb-2'
                        light
                    />
                    <div className='writing-test-question-content'>
                        {children}
                    </div>
                </>
            )}
    </>
);

Question.propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.string,
    filename: PropTypes.string,
};

Question.defaultProps = {
    text: undefined,
    filename: undefined,
};

export default Question;
