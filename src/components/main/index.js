import _ from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from '../mainDrawer';
import {
    Confirmation,
    Error,
    Logo,
} from '../common';
import UserMenu from './UserMenu';
import Authenticating from './Authenticating';
import {
    useMount,
    useActions,
    useStore,
    useService,
    useProvider,
    useIsWideScreenMode,
    useWindowSize,
    useRoutes,
} from '../../hooks';

function Main({ authenticate }) {
    const dimensions = useWindowSize();
    const [
        interceptorService,
        keycloakService,
        userService,
        historyService,
    ] = useService(
        'interceptor',
        'keycloak',
        'user',
        'history',
    );
    const [error, setError] = useState({
        error: false,
        msg: 'Failed to authenticate user.',
    });
    const routes = useRoutes('main');
    const routesAssemblerService = useProvider('route')();
    const { open: drawerOpen, enabled: drawerEnabled } = useStore('drawer');
    const { displayName, authenticated } = useStore('userSession');
    const { confirmed: dialogConfirmed, canceled: dialogCanceled, key: dialogKey } = useStore('dialog');
    const { login: loginUser, logout: logoutUser } = useActions('userSession');
    const { toggle: toggleDrawer } = useActions('drawer');
    const { showDialog, hideDialog } = useActions('dialog');
    const { disable: disableDrawer } = useActions('drawer');
    const wideScreenMode = useIsWideScreenMode();

    const fetchUser = async authenticatedUser => {
        if (_.isNil(authenticatedUser)) return null;
        return userService.login();
    };

    const logout = useCallback(async () => {
        try {
            historyService.go('/');
            logoutUser();
            await keycloakService.logout();
        } catch (err) {
            ToastsStore.error('Failed to logout');
        }
    }, [historyService, keycloakService, logoutUser]);

    const login = async () => {
        if (_.eq(authenticate, false)) {
            return;
        }
        let authenticatedUser = null;
        // The version of Keycloak we are using by itself is broken, we need to catch the error 'kc.login(...).success is not a function'.
        try { authenticatedUser = await keycloakService.login(); } catch (err) {
            if (_.eq(err.name, 'authentication')) {
                return setError({
                    error: true,
                    msg: 'Failed to retrieve authentication token from the Keycloak service.',
                });
            }
        }
        interceptorService.registerRequestInterceptor(request => (request.headers.Authorization = `Bearer ${keycloakService.getToken()}`));
        interceptorService.registerUnauthorizedInterceptor(async () => {
            try {
                logoutUser();
                await keycloakService.logout();
            } catch (err) {}
        });
        const user = await fetchUser(authenticatedUser);
        if (!_.isNil(user)) {
            loginUser(user);
        }
    };

    const confirmLogout = () => {
        if (_.includes(historyService.getUrl(), 'test/wizard')) {
            return showDialog({
                title: 'Your session will be whiped out when you logout, are you sure?',
                key: 'main',
            });
        }
        logout();
    };

    useEffect(() => {
        if (dialogConfirmed && _.eq(dialogKey, 'main')) {
            logout();
            hideDialog();
        }
    }, [dialogConfirmed, hideDialog, dialogKey, logout]);

    useEffect(() => {
        if (dialogCanceled && _.eq(dialogKey, 'main')) {
            hideDialog();
        }
    }, [dialogCanceled, dialogKey, hideDialog]);

    useMount(async () => {
        disableDrawer();
        const lastVisitedRoute = localStorage.getItem('$lastVisitedRoute');
        // If we left off at a wizard session we should always go back to it.
        if (_.eq(lastVisitedRoute, '/test/wizard')) {
            if (!_.eq(historyService.getUrl(), '/test/wizard')) {
                historyService.go('/test/wizard');
            }
        } else if (!_.isNil(lastVisitedRoute) && !_.eq(lastVisitedRoute, historyService.getUrl())) {
            historyService.go(localStorage.getItem('$lastVisitedRoute'));
        }
        // Responsible for parsing all request from camel case to snake case and responses from snake case to camel case.
        interceptorService.registerDataTransformInterceptor();
        interceptorService.registerUnhandledInterceptor(() => console.error('Server failed to send back a response or has crashed.'));
        try {
            await login();
        } catch (err) {
            setError({
                error: true,
                msg: 'Failed to verify authentication token from the API service.',
            });
        }
    });

    return (
        <>
            {_.eq(authenticated, true) && (
                <>
                    <AppBar position='fixed'>
                        <Toolbar className='tool-bar'>
                            <div className='hamburger-button-container'>
                                <IconButton
                                    className={clsx(
                                        'hamburger-button',
                                        { hide: !drawerEnabled },
                                    )}
                                    onClick={() => historyService.getUrl().includes('/admin') && toggleDrawer()}
                                >
                                    <MenuIcon className='hamburger-button-icon' />
                                </IconButton>
                            </div>
                            <Logo />
                            <div className='app-bar-segment'>
                                <h5 className={
                                    clsx(
                                        'app-title',
                                        { 'hide-visibility': dimensions.width < 690 },
                                    )
                                }
                                >
                                    Platform for Testing Language Learners
                                </h5>
                                <UserMenu
                                    displayName={displayName}
                                    dropdowns={[
                                        authenticated && {
                                            title: 'Logout',
                                            Icon: <ExitToAppIcon />,
                                            handler: confirmLogout,
                                        },
                                    ]}
                                />
                            </div>
                        </Toolbar>
                    </AppBar>
                    <main className={clsx(
                        { content: !drawerEnabled || !drawerOpen || !wideScreenMode },
                        { 'content-shift': drawerEnabled && drawerOpen && wideScreenMode },
                    )}
                    >
                        <Switch>{routesAssemblerService.assemble(routes)}</Switch>
                        <Drawer />
                        <ToastsContainer store={ToastsStore} />
                        <Confirmation />
                    </main>
                </>
            )}
            {!authenticated && !error.error && <Authenticating />}
            {error.error && <Error msg={error.msg} />}
        </>
    );
}

Main.propTypes = { authenticate: PropTypes.bool };
Main.defaultProps = { authenticate: true };

export default Main;
