import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { useWindowSize } from '../../hooks';
import { Button } from '../common';

function TestTakerScheduleDetails({
    testName,
    open: openProps,
    coordinates: coordinatesProps,
    handleClose,
    startDatetime,
    endDatetime,
    canTakeTest,
    onTestStart,
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
            onClose={handleClose}
            open={open}
        >
            <div
                className='test-taker-schedule-details'
                style={{
                    top: `${(y + 230 >= height ? height - 250 : y) - 20}px`,
                    left: `${(x + 400 >= width ? width - 425 : x) + 20}px`,
                }}
            >
                <h1 className='test-taker-schedule-details-title'><b>{testName}</b></h1>
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
                    <h4 className='test-taker-schedule-highlighted-text'>
                        <b>This test has been taken</b>
                    </h4>
                )}
                {!canTakeTest && !taken && isPast && (
                    <h4 className='test-taker-schedule-highlighted-text'>
                        <b>This test was scheduled but not taken</b>
                    </h4>
                )}
                {canTakeTest && (
                    <Button
                        className='my-3'
                        onClick={onTestStart}
                    >
                        Take Test
                    </Button>
                )}
            </div>
        </Modal>
    );
}

TestTakerScheduleDetails.propTypes = {
    testName: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    coordinates: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    startDatetime: PropTypes.string.isRequired,
    endDatetime: PropTypes.string.isRequired,
    onTestStart: PropTypes.func.isRequired,
    canTakeTest: PropTypes.bool.isRequired,
    studentClassName: PropTypes.string,
    taken: PropTypes.bool.isRequired,
    isPast: PropTypes.bool.isRequired,
};

TestTakerScheduleDetails.defaultProps = { studentClassName: 'Unknown' };

export default TestTakerScheduleDetails;
