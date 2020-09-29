import _ from 'lodash';
import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DrawerItem from './DrawerItem';
import {
    useMount,
    useUnmount,
    useStore,
    useActions,
} from '../../hooks';
import { Logo } from '../common';

function CustomDrawer({
    depthStep,
    expanded,
    items,
    depth,
    onItemClick,
}) {
    const { open } = useStore('drawer');
    const { enable, disable, toggle } = useActions('drawer');

    // Using this trick we can show/hide hamburger button which lives on a seperate component
    // Enabled boolean will automatically be true when this component mounts.
    useMount(enable);
    // Enabled boolean will automatically be false when this component unmounts.
    useUnmount(disable);

    return (
        <Drawer
            anchor='left'
            classes={{ paper: 'drawer' }}
            open={open}
            variant='persistent'
        >
            <div className='drawer-header'>
                <IconButton onClick={() => toggle()}>
                    <ChevronLeftIcon />
                </IconButton>
                <Logo />
            </div>
            <Divider />
            <List>
                {_.map(items, (drawerItem, index) => (
                    <React.Fragment key={`${drawerItem.name}${index}`}>
                        {_.eq(drawerItem, 'divider') ? (
                            <Divider />
                        ) : (
                            <DrawerItem
                                depth={depth}
                                depthStep={depthStep}
                                expanded={expanded}
                                item={drawerItem}
                                onClick={onItemClick}
                            />
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Drawer>

    );
}

CustomDrawer.propTypes = {
    depthStep: PropTypes.number,
    depth: PropTypes.number,
    expanded: PropTypes.bool,
    items: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
};

CustomDrawer.defaultProps = {
    depthStep: 10,
    depth: 0,
    expanded: undefined,
};

export default CustomDrawer;
