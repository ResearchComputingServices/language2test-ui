import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { useWindowSize } from '../../hooks';
import { Button } from '../common';

function TestScheduleDetails({
    testName,
    open: openProps,
    coordinates: coordinatesProps,
    handleClose,
    startDatetime,
    endDatetime,
    canTakeTest,
    onTestStart,
    testId,
    studentClassName,
    taken,
    isPast,
}) {
    const [open, setOpen] = useState(openProps);
    const [coordinates, setCoordinates] = useState(coordinatesProps);
    const { height, width } = useWindowSize();
    const [x, y] = coordinates;

    useEffect(() => {
        setOpen(openProps);
    }, [openProps]);

    useEffect(() => {
        setCoordinates(coordinatesProps);
    }, [coordinatesProps]);

    return (
        <Modal
            aria-describedby='simple-modal-description'
            aria-labelledby='simple-modal-title'
            onClose={handleClose}
            open={open}
        >
            <div
                className='test-schedule-details'
                style={{
                    top: `${(y + 230 >= height ? height - 250 : y) - 20}px`,
                    left: `${(x + 400 >= width ? width - 425 : x) + 20}px`,
                }}
            >
                <h1 className='test-schedule-details-title'><b>{testName}</b></h1>
                <h4>
                    <b>From</b>
                    {`: ${startDatetime}`}
                </h4>
                <h4>
                    <b>To</b>
                    {`: ${endDatetime}`}
                </h4>
                <h4>
                    <b>Class</b>
                    {`: ${studentClassName}`}
                </h4>
                {taken && (
                    <h4 className='test-schedule-highlighted-text'>
                        <b>This test has been taken</b>
                    </h4>
                )}
                {!canTakeTest && !taken && isPast && (
                    <h4 className='test-schedule-highlighted-text'>
                        <b>This test was scheduled but not taken</b>
                    </h4>
                )}
                {canTakeTest && (
                    <Button
                        className='my-3'
                        onClick={() => onTestStart(testId)}
                    >
                        Take Test
                    </Button>
                )}
            </div>
        </Modal>
    );
}

TestScheduleDetails.propTypes = {
    testName: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    coordinates: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    startDatetime: PropTypes.string.isRequired,
    endDatetime: PropTypes.string.isRequired,
    onTestStart: PropTypes.func.isRequired,
    canTakeTest: PropTypes.bool.isRequired,
    studentClassName: PropTypes.string,
    testId: PropTypes.number,
    taken: PropTypes.bool.isRequired,
    isPast: PropTypes.bool.isRequired,
};

TestScheduleDetails.defaultProps = {
    testId: undefined,
    studentClassName: 'Unknown',
};

export default TestScheduleDetails;
