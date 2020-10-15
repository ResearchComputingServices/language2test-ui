import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import List from './List';

function SelectionList({ data, renderRow, emptyTitle, pageSize }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
        }}
        >
            <List
                data={data}
                emptyTitle={emptyTitle}
                pageSize={pageSize}
                renderRow={renderRow}
            />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                width: 250,
                height: 50,
                marginTop: -50,
            }}
            >
                <IconButton>
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton>
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
            <List
                data={data}
                emptyTitle={emptyTitle}
                pageSize={pageSize}
                paginationAlignment='right'
                renderRow={renderRow}
            />
        </div>
    );
}

SelectionList.propTypes = {
    data: PropTypes.array,
    renderRow: PropTypes.func.isRequired,
    emptyTitle: PropTypes.string,
    pageSize: PropTypes.number,
};

SelectionList.defaultProps = {
    data: [],
    emptyTitle: 'List is Empty',
    pageSize: 10,
};

export default SelectionList;
