import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import _ from 'lodash';
import Drawer from '../drawer';
import {
    useService,
    useRoutes,
    useDrawer,
    useProvider,
} from '../../hooks';

export default function() {
    const historyService = useService('history');
    const routes = useRoutes('administrator');
    const administratorPanels = useDrawer('administrator');
    const routesAssemblerService = useProvider('route')();
    const drawerAssemblerService = useProvider('drawer')();
    // These are declared as state, because we don't want to compute the expensive operations when component re-renders.
    const [panelList] = useState(drawerAssemblerService.flattenItems(administratorPanels));
    const [drawerItems] = useState(drawerAssemblerService.assembleItems(administratorPanels));
    const [drawerRoutes] = useState(routesAssemblerService.assemble(routes));

    const getPanelPathFromIndex = (panelList, index) => (panelList[index] || {}).path || '/';

    const onItemClick = (event, path) => historyService.go(path);

    const fixInvalidRouting = () => {
        const fragments = historyService.getUrlFragments();
        const panelName = fragments[1];
        let isPanelNameValid = _.isEmpty(panelList);
        if (!isPanelNameValid && _.isNil(panelName)) {
            historyService.go(getPanelPathFromIndex(panelList, 0));
        }
        for (let i = 0; i < panelList.length; ++i) {
            const panel = panelList[i];
            if (panel.path.includes(panelName)) {
                isPanelNameValid = true;
                break;
            }
        }
        if (!isPanelNameValid) {
            historyService.go(getPanelPathFromIndex(panelList, 0));
        }
    };

    useEffect(fixInvalidRouting);

    return (
        <>
            <Drawer
                items={drawerItems}
                onItemClick={onItemClick}
            />
            <Switch>
                {drawerRoutes}
            </Switch>
        </>
    );
}
