import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import ListModal from './ListModal';
import useListModal from './useListModal';

function ClozeQuestionPendingTyped({ id }) {
    const {
        show,
        onShow,
        onHide,
        onAccept,
        onReject,
        loading,
        error,
        refreshCounter,
    } = useListModal('pending');

    return (
        <>
            <Tooltip title='Check Pending Typed Answers'>
                <IconButton
                    className='no-text-transform'
                    color='primary'
                    onClick={onShow}
                    size='small'
                >
                    <HelpIcon className='indicisive-icon' />
                </IconButton>
            </Tooltip>
            {show && (
                <ListModal
                    error={error}
                    id={id}
                    loading={loading}
                    onAccept={onAccept}
                    onHide={onHide}
                    onReject={onReject}
                    // TODO Hack
                    refreshCounter={refreshCounter}
                    show={show}
                    storeName='clozeQuestionPendingTyped'
                    title='Pending Typed Answers'
                />
            )}
        </>
    );
}

ClozeQuestionPendingTyped.propTypes = { id: PropTypes.number.isRequired };

export default ClozeQuestionPendingTyped;
