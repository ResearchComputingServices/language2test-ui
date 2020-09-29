import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import ListModal from './ListModal';
import useListModal from './useListModal';

function ClozeQuestionPendingTyped({ id }) {
    const {
        show,
        onShow,
        onHide,
        onAccept,
        onPending,
        loading,
        error,
        refreshCounter,
    } = useListModal('incorrect');

    return (
        <>
            <Tooltip title='Check Incorrectly Typed Answers'>
                <IconButton
                    className='no-text-transform'
                    color='primary'
                    onClick={onShow}
                    size='small'
                >
                    <ClearIcon className='incorrect-icon' />
                </IconButton>
            </Tooltip>
            {show && (
                <ListModal
                    error={error}
                    id={id}
                    loading={loading}
                    onAccept={onAccept}
                    onHide={onHide}
                    onPending={onPending}
                    // TODO Hack
                    refreshCounter={refreshCounter}
                    show={show}
                    storeName='clozeQuestionIncorrectlyTyped'
                    title='Incorrectly Typed Answers'
                />
            )}
        </>
    );
}

ClozeQuestionPendingTyped.propTypes = { id: PropTypes.number.isRequired };

export default ClozeQuestionPendingTyped;
