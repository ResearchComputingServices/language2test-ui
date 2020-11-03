import React from 'react';
import { Drawer } from '../common';
import { useService } from '../../hooks';
import useMainDrawer from './useMainDrawer';

export default function() {
    const historyService = useService('history');
    const { getDrawerItems } = useMainDrawer();

    const onItemClick = (event, path) => historyService.go(path);

    return (
        <>
            <Drawer
                items={getDrawerItems()}
                onItemClick={onItemClick}
            />
        </>
    );
}
