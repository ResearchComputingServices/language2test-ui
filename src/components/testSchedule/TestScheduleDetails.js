import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';

function TestScheduleDetails({
    open: openProps,
    coordinates: coordinatesProps,
    handleClose,
}) {
    const [open, setOpen] = useState(openProps);
    const [coordinates, setCoordinates] = useState(coordinatesProps);
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
                    top: `${y}px`,
                    left: `${x + 20}px`,
                }}
            >
                <h2 id='simple-modal-title'>Text in a modal</h2>
                <p id='simple-modal-description'>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
            </div>
        </Modal>
    );
}

TestScheduleDetails.propTypes = {
    open: PropTypes.bool.isRequired,
    coordinates: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default TestScheduleDetails;
