import _ from 'lodash';
import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import { useActions, useIsWideScreenMode } from '../../hooks';

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

export default DrawerItem;
