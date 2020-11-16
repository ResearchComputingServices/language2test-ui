import _ from 'lodash';
import React, { useState } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import { Logo } from '.';
import {
    useMount,
    useUnmount,
    useStore,
    useActions,
    useIsWideScreenMode,
} from '../../hooks';

function DrawerItem({
    depthStep,
    depth,
    expanded,
    item,
    open,
    onClick: onClickProp,
    ...rest
}) {
    const wideScreenMode = useIsWideScreenMode();
    const [collapsed, setCollapsed] = useState(!open);
    const { title, items, path, Icon } = item;
    const { toggle } = useActions('drawer');

    function toggleCollapse() {
        setCollapsed(prevValue => !prevValue);
    }

    function onClick(e) {
        if (Array.isArray(items)) {
            toggleCollapse();
        } else if (!wideScreenMode) {
            toggle();
        }
        if (onClick) {
            onClickProp(e, path);
        }
    }

    let expandIcon;

    if (Array.isArray(items) && items.length) {
        expandIcon = !collapsed ? (
            <ExpandLessIcon className='drawer-item-expand-arrow drawer-item-expand-arrow-expanded' />
        ) : (
            <ExpandMoreIcon className='drawer-item-expand-arrow' />
        );
    }

    return (
        <>
            <ListItem
                button
                className='drawer-item'
                dense
                onClick={onClick}
                {...rest}
            >
                <div
                    className='drawer-item-content'
                    style={{ paddingLeft: depth * depthStep }}
                >
                    {Icon && (
                        <Icon
                            className='drawer-item-icon'
                            fontSize='small'
                        />
                    )}
                    <div className='drawer-item-text'>{title}</div>
                </div>
                {expandIcon}
            </ListItem>
            <Collapse
                in={!collapsed}
                timeout='auto'
                unmountOnExit
            >
                {Array.isArray(items) ? (
                    <List
                        dense
                        disablePadding
                    >
                        {_.map(items, (subItem, index) => (
                            <React.Fragment key={`${subItem.name}${index}`}>
                                {_.eq(subItem, 'divider') ? (
                                    <Divider />
                                ) : (
                                    <DrawerItem
                                        depth={depth + 1}
                                        depthStep={depthStep}
                                        item={subItem}
                                        onClick={onClickProp}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                ) : null}
            </Collapse>
        </>
    );
}

function CustomDrawer({
    depthStep,
    expanded,
    items,
    depth,
    onItemClick,
    classes,
    className,
    style,
}) {
    const { open = false } = useStore('drawer');
    const { enable = _.noop, disable = _.noop, toggle = _.noop } = useActions('drawer');

    useMount(enable);
    useUnmount(disable);

    return (
        <Drawer
            anchor='left'
            classes={{ ...classes, paper: 'drawer MuiPaper-elevation2' }}
            className={className}
            open={open}
            style={style}
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

DrawerItem.propTypes = {
    depthStep: PropTypes.number,
    depth: PropTypes.number,
    expanded: PropTypes.bool,
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    open: PropTypes.bool,
};

DrawerItem.defaultProps = {
    depthStep: 10,
    depth: 0,
    expanded: undefined,
    open: true,
};

CustomDrawer.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    depthStep: PropTypes.number,
    depth: PropTypes.number,
    expanded: PropTypes.bool,
    items: PropTypes.array,
    onItemClick: PropTypes.func,
    classes: PropTypes.object,
};

CustomDrawer.defaultProps = {
    style: undefined,
    className: undefined,
    items: [],
    onItemClick: _.noop,
    depthStep: 10,
    depth: 0,
    expanded: undefined,
    classes: {},
};

export default CustomDrawer;
