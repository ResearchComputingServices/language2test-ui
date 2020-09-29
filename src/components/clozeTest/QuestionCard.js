import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import _ from 'lodash';

function QuestionCard({ children, sequence }) {
    return (
        <Card
            className='cloze-test-card'
        >
            {!_.isNil(sequence) && (
                <div className='mb-5'>
                    <p className='h4'>
                        {`Cloze - ${sequence}`}
                    </p>
                </div>
            )}
            {children}
        </Card>
    );
}

QuestionCard.propTypes = {
    children: PropTypes.node.isRequired,
    sequence: PropTypes.number,
};

QuestionCard.defaultProps = { sequence: undefined };

export default QuestionCard;
