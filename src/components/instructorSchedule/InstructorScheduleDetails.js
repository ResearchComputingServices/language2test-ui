import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { useWindowSize } from '../../hooks';

function InstructorScheduleDetails({
    testName,
    open: openProps,
    coordinates: coordinatesProps,
    handleClose,
    startDatetime,
    endDatetime,
    studentClassNames,
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
                className='instructor-schedule-details'
                style={{
                    top: `${(y + 230 >= height ? height - 250 : y) - 20}px`,
                    left: `${(x + 400 >= width ? width - 425 : x) + 20}px`,
                }}
            >
                <h1 className='instructor-schedule-details-title'><b>{testName}</b></h1>
                <h4>
                    <b>From</b>
                    {`: ${startDatetime}`}
                </h4>
                <h4>
                    <b>To</b>
                    {`: ${endDatetime}`}
                </h4>
                <h4>
                    <b>Classes</b>
                    {`: ${studentClassNames}`}
                </h4>
                {isPast && (
                    <h4 className='instructor-schedule-highlighted-text'>
                        <b>Test has been taken.</b>
                    </h4>
                )}
            </div>
        </Modal>
    );
}

InstructorScheduleDetails.propTypes = {
    testName: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    coordinates: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    startDatetime: PropTypes.string.isRequired,
    endDatetime: PropTypes.string.isRequired,
    studentClassNames: PropTypes.string,
    isPast: PropTypes.bool.isRequired,
};

InstructorScheduleDetails.defaultProps = { studentClassNames: 'Unknown' };

export default InstructorScheduleDetails;
