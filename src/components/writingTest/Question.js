import _ from 'lodash';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import Image from '../image';

const Question = ({
    children,
    sequence,
    text,
    filename,
    type,
}) => (
    <>
        {!_.isNil(children)
            && (
                <>
                    {_.eq(type, 'image') && (
                        <div className='writing-test-question-title-image'>
                            {!_.isNil(sequence) && `${sequence}.`}
                            <Image imageName={filename} />
                        </div>
                    )}
                    <div className='writing-test-question-title-text'>
                        {_.eq(type, 'text') && (
                            <>
                                {!_.isNil(sequence) && `${sequence}. ${text}`}
                                {_.isNil(sequence) && text}
                            </>
                        )}
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
    sequence: PropTypes.number,
    filename: PropTypes.string,
    type: PropTypes.string.isRequired,
};

Question.defaultProps = {
    sequence: undefined,
    text: undefined,
    filename: undefined,
};

export default Question;
