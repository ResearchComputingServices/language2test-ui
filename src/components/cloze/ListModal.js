import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import HelpIcon from '@material-ui/icons/Help';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { ModalInfo, PaginatedList } from '../common';
import useListModal from './useListModal';
import { useList, useEffect } from '../../hooks';

function ListModal({
    id,
    show,
    onHide,
    storeName,
    title,
    onAccept,
    onReject,
    onPending,
    loading: outerLoading,
    error: outerError,
    // TODO Hack
    refreshCounter,
}) {
    const {
        loading,
        error,
        data,
        onPaginationChange,
        count,
        page,
    } = useList(storeName, {
        query: { null: id },
        // TODO Hack
        dependencies: [refreshCounter],
    });

    const [getChecked, setChecked] = useListModal(data);

    const handleToggle = index => () => {
        const newChecked = [...getChecked()];
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);
    };

    useEffect(() => {
        setChecked(_.map(data, () => false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <>
            <ModalInfo
                onHide={onHide}
                show={show}
                staticModal
                title={title}
            >
                <PaginatedList
                    actions={_.compact([
                        !_.isNil(onAccept) && {
                            Icon: <CheckIcon className='correct-icon' />,
                            onClick: data => onAccept(data, getChecked()),
                        },
                        !_.isNil(onReject) && {
                            Icon: <ClearIcon className='incorrect-icon' />,
                            onClick: data => onReject(data, getChecked()),
                        },
                        !_.isNil(onPending) && {
                            Icon: <HelpIcon className='indicisive-icon' />,
                            onClick: data => onPending(data, getChecked()),
                        },
                    ])}
                    count={count}
                    data={data}
                    error={error || outerError}
                    loading={loading || outerLoading}
                    onPaginationChange={onPaginationChange}
                    page={page}
                    renderRow={(datum, index) => {
                        const value = datum.text;
                        return (
                            <ListItem
                                key={index}
                                button
                                onClick={handleToggle(index)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={getChecked()[index]}
                                        tabIndex={-1}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={`${value}`} />
                            </ListItem>
                        );
                    }}
                />
            </ModalInfo>
        </>
    );
}

ListModal.propTypes = {
    storeName: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    onAccept: PropTypes.func,
    onReject: PropTypes.func,
    onPending: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    // TODO Hack
    refreshCounter: PropTypes.number,
};

ListModal.defaultProps = {
    title: 'List',
    onAccept: undefined,
    onReject: undefined,
    onPending: undefined,
    loading: false,
    error: false,
    // TODO Hack
    refreshCounter: 0,
};

export default ListModal;
