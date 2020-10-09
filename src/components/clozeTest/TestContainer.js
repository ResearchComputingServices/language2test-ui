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
    <div className='cloze-test'>
        <TestProgress
            current={current}
            total={total}
        />
        <Paper className='cloze-test-content'>
            {children}
        </Paper>
        <TestControls
            disablePreviousBtn
            nextButtonTitle={_.eq(current, total) ? 'Finish Cloze Test' : 'Next Cloze'}
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
            previousButtonTitle='Previous Cloze'
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
