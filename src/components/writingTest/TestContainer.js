import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import TestProgress from '../testWizardUtilities/TestProgress';
import TestControls from '../testWizardUtilities/TestControls';

const TestContainer = ({
    current,
    total,
    onPreviousClick,
    onNextClick,
    children,
}) => (
    <div className='writing-test'>
        <TestProgress
            current={current}
            total={total}
        />
        <Card
            className='writing-test-content'
            elevation={1}
        >
            {children}
        </Card>
        <TestControls
            disablePreviousBtn
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
        />
    </div>
);

TestContainer.propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onPreviousClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default TestContainer;
