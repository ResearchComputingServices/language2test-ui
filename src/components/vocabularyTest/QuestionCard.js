import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import _ from 'lodash';

function QuestionCard({
    sequence,
    size,
    word,
    difficulty,
    children,
}) {
    const cardSizeMap = {
        small: 'vocabulary-test-question-content-small',
        large: 'vocabulary-test-question-content-large',
        wide: 'vocabulary-test-question-content-wide',
    };
    return (
        <>
            <div className='d-flex flex-column align-items-center'>
                <Card className={cardSizeMap[size] ? cardSizeMap[size] : 'vocabulary-test-question-content-small'}>
                    <div className='d-flex justify-content-between'>
                        {sequence && (
                            <p>
                                {sequence}
                                .
                            </p>
                        )}
                        <p>
                            {`Difficulty Level: ${difficulty}`}
                        </p>
                    </div>
                    {_.eq(size, 'large')
                        ? (
                            <h4 className='vocabulary-test-question-content-title-large'>
                                Which is a synonym of &quot;
                                {word}
                                &quot;?
                            </h4>
                        )
                        : (
                            <p className='my-3 vocabulary-test-question-content-title-small'>
                                Which is a synonym of &quot;
                                {word}
                                &quot;?
                            </p>
                        )}
                    {children}
                </Card>
            </div>
        </>
    );
}

QuestionCard.propTypes = {
    size: PropTypes.string,
    sequence: PropTypes.number,
    word: PropTypes.string,
    difficulty: PropTypes.string,
    children: PropTypes.node.isRequired,
};

QuestionCard.defaultProps = {
    size: 'large',
    sequence: undefined,
    word: '',
    difficulty: '',
};

export default QuestionCard;
