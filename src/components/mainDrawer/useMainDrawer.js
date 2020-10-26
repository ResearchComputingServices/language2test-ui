import {
    useDrawer,
    useProvider,
    useRefState,
} from '../../hooks';

export default function useAdministrator() {
    const administratorPanels = useDrawer('main');
    const drawerAssemblerService = useProvider('drawer')();
    // These are declared as state, because we don't want to compute the expensive operations when component re-renders.
    const [getPanelList] = useRefState(drawerAssemblerService.flattenItems(administratorPanels));
    const [getDrawerItems] = useRefState(drawerAssemblerService.assembleItems(administratorPanels));

    return {
        getPanelList,
        getDrawerItems,
    };
}
