import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import ListModal from './ListModal';
import useTypedListModal from './useTypedListModal';

function ClozeQuestionPendingTyped({ id }) {
    const {
        getShow,
        getLoading,
        getError,
        getRefreshCounter,
        onShow,
        onHide,
        onAccept,
        onPending,
    } = useTypedListModal('incorrect');

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
            {getShow() && (
                <ListModal
                    error={getError()}
                    id={id}
                    loading={getLoading()}
                    onAccept={onAccept}
                    onHide={onHide}
                    onPending={onPending}
                    // TODO Hack
                    refreshCounter={getRefreshCounter}
                    show={getShow()}
                    storeName='clozeQuestionIncorrectlyTyped'
                    title='Incorrectly Typed Answers'
                />
            )}
        </>
    );
}

ClozeQuestionPendingTyped.propTypes = { id: PropTypes.number.isRequired };

export default ClozeQuestionPendingTyped;
