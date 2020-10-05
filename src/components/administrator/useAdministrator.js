import {
    useRoutes,
    useDrawer,
    useProvider,
    useRefState,
} from '../../hooks';

export default function useAdministrator() {
    const routes = useRoutes('administrator');
    const administratorPanels = useDrawer('administrator');
    const routesAssemblerService = useProvider('route')();
    const drawerAssemblerService = useProvider('drawer')();
    // These are declared as state, because we don't want to compute the expensive operations when component re-renders.
    const [getPanelList] = useRefState(drawerAssemblerService.flattenItems(administratorPanels));
    const [getDrawerItems] = useRefState(drawerAssemblerService.assembleItems(administratorPanels));
    const [getDrawerRoutes] = useRefState(routesAssemblerService.assemble(routes));

    return {
        getPanelList,
        getDrawerItems,
        getDrawerRoutes,
    };
}
