import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TestProgress from '../testWizardUtilities/TestProgress';
import TestControls from '../testWizardUtilities/TestControls';

const TestContainer = ({
    current,
    total,
    onPreviousClick,
    onNextClick,
    children,
}) => (
    <div className='reading-comprehension-test'>
        <TestProgress
            current={current}
            total={total}
        />
        <Paper className='reading-comprehension-test-content'>
            {children}
        </Paper>
        <TestControls
            disablePreviousBtn
            nextButtonTitle={_.eq(current, total) ? 'Finish Reading Comprehension Test' : 'Next Reading Comprehension'}
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
            previousButtonTitle='Previous Reading Comprehension'
        />
    </div>
);

TestContainer.propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onPreviousClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    children: PropTypes.node,
};

TestContainer.defaultProps = { children: null };

export default TestContainer;
