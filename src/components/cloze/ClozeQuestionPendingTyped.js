import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
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
        onReject,
    } = useTypedListModal('pending');

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
            {getShow() && (
                <ListModal
                    error={getError()}
                    id={id}
                    loading={getLoading()}
                    onAccept={onAccept}
                    onHide={onHide}
                    onReject={onReject}
                    // TODO Hack
                    refreshCounter={getRefreshCounter()}
                    show={getShow()}
                    storeName='clozeQuestionPendingTyped'
                    title='Pending Typed Answers'
                />
            )}
        </>
    );
}

ClozeQuestionPendingTyped.propTypes = { id: PropTypes.number.isRequired };

export default ClozeQuestionPendingTyped;
