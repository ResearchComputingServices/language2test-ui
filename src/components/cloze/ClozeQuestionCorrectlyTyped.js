import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import Tooltip from '@material-ui/core/Tooltip';
import ListModal from './ListModal';
import useListModal from './useListModal';

function ClozeQuestionPendingTyped({ id }) {
    const {
        show,
        onShow,
        onHide,
        onReject,
        onPending,
        loading,
        error,
        refreshCounter,
    } = useListModal('correct');

    return (
        <>
            <Tooltip title='Check Correctly Typed Answers'>
                <IconButton
                    className='no-text-transform'
                    color='primary'
                    onClick={onShow}
                    size='small'
                >
                    <CheckIcon className='correct-icon' />
                </IconButton>
            </Tooltip>
            {show && (
                <ListModal
                    error={error}
                    id={id}
                    loading={loading}
                    onHide={onHide}
                    onPending={onPending}
                    onReject={onReject}
                    // TODO Hack
                    refreshCounter={refreshCounter}
                    show={show}
                    storeName='clozeQuestionCorrectlyTyped'
                    title='Correctly Typed Answers'
                />
            )}
        </>
    );
}

ClozeQuestionPendingTyped.propTypes = { id: PropTypes.number.isRequired };

export default ClozeQuestionPendingTyped;
