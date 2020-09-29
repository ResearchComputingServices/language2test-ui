import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropTypes from 'prop-types';
import _ from 'lodash';

function UserMenu({ displayName, dropdowns }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpen = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    dropdowns = _.compact(dropdowns);

    return (
        <div>
            <div
                className='user-menu'
                onClick={handleOpen}
                onKeyDown={() => _.noop()}
                role='menuitem'
                tabIndex={0}
            >
                <h2 className='display-name'>
                    {displayName}
                </h2>
                {!_.isEmpty(dropdowns) && <ArrowDropDownIcon className='arrow-dropdown' />}
            </div>
            {!_.isEmpty(dropdowns)
                && (
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        elevation={2}
                        getContentAnchorEl={null}
                        keepMounted
                        onClose={handleClose}
                        open={Boolean(anchorEl)}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {_.map(dropdowns, (dropdown, index) => (
                            <MenuItem
                                key={index}
                                data-testid={`user-menu-item-${dropdown.title}`}
                                disabled={dropdown.disabled}
                                onClick={() => {
                                    _.isFunction(dropdown.handler) && dropdown.handler();
                                    handleClose();
                                }}
                            >
                                {dropdown.Icon}
                                <span className='pl-2'>
                                    {' '}
                                    {dropdown.title}
                                    {' '}
                                </span>
                            </MenuItem>
                        ))}
                    </Menu>
                )}
        </div>
    );
}

UserMenu.propTypes = {
    dropdowns: PropTypes.array,
    displayName: PropTypes.string.isRequired,
};

UserMenu.defaultProps = { dropdowns: [] };

export default UserMenu;
