import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TestProgress from '../testWizardUtilities/TestProgress';
import TestControls from '../testWizardUtilities/TestControls';

function TestContainer({
    current,
    total,
    onNextClick,
    onPreviousClick,
    children,
}) {
    return (
        <div className='vocabulary-test'>
            <TestProgress
                current={current}
                total={total}
            />
            {children}
            <TestControls
                disablePreviousBtn
                nextButtonTitle={_.eq(current, total) ? 'Finish Vocabulary Test' : 'Next Vocabulary'}
                onNextClick={onNextClick}
                onPreviousClick={onPreviousClick}
                previousButtonTitle='Previous Vocabulary'
            />
        </div>
    );
}

TestContainer.propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onNextClick: PropTypes.func.isRequired,
    onPreviousClick: PropTypes.func.isRequired,
    children: PropTypes.node,
};

TestContainer.defaultProps = { children: null };

export default TestContainer;
