import React, { useEffect, useState } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { Button } from '../common';
import { useWindowSize } from '../../hooks';

function InstructorScheduleDetails({
    testName,
    open: openProps,
    coordinates: coordinatesProps,
    handleClose,
    startDatetime,
    endDatetime,
    studentClassNames,
    onViewTestSessions,
    onEditAssignation,
    isPast,
    id,
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
                <div className='pb-3 space-between'>
                    <h1><b>{testName}</b></h1>
                    <Tooltip title='Edit Assignation'>
                        <IconButton onClick={() => onEditAssignation(id)}><EditIcon /></IconButton>
                    </Tooltip>
                </div>
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
                        <b>Students have completed this test.</b>
                    </h4>
                )}
                {
                    <Button
                        className='my-3'
                        onClick={() => onViewTestSessions(id)}
                    >
                        View Past Results
                    </Button>
                }
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
    id: PropTypes.number.isRequired,
    onViewTestSessions: PropTypes.func.isRequired,
    onEditAssignation: PropTypes.func.isRequired,
};

InstructorScheduleDetails.defaultProps = { studentClassNames: 'Unknown' };

export default InstructorScheduleDetails;
