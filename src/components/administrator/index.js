import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import _ from 'lodash';
import Drawer from '../drawer';
import { useService } from '../../hooks';
import useAdministrator from './useAdministrator';

export default function() {
    const historyService = useService('history');
    const {
        getPanelList,
        getDrawerItems,
        getDrawerRoutes,
    } = useAdministrator();

    const getPanelPathFromIndex = (panelList, index) => (panelList[index] || {}).path || '/';

    const onItemClick = (event, path) => historyService.go(path);

    const fixInvalidRouting = () => {
        const fragments = historyService.getUrlFragments();
        const panelName = fragments[1];
        const panelList = getPanelList();
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
                items={getDrawerItems()}
                onItemClick={onItemClick}
            />
            <Switch>
                {getDrawerRoutes()}
            </Switch>
        </>
    );
}
