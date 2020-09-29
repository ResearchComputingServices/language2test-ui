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
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentIcon from '@material-ui/icons/Assignment';
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
    useAuthorizationCheckerService,
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
    const authorizationCheckerService = useAuthorizationCheckerService();
    const routesAssemblerService = useProvider('routes')();
    const routes = useRoutes('main');
    const [error, setError] = useState({
        error: false,
        msg: 'Failed to authenticate user.',
    });
    const { open: drawerOpen, enabled: drawerEnabled } = useStore('drawer');
    const { displayName, authenticated } = useStore('userSession');
    const { confirmed: dialogConfirmed, canceled: dialogCanceled, key: dialogKey } = useStore('dialog');
    const { login: loginUser, logout: logoutUser } = useActions('userSession');
    const { toggle: toggleDrawer, hide: hideDrawer, show: showDrawer } = useActions('drawer');
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
    }, [keycloakService, logoutUser, historyService]);

    const login = async () => {
        if (_.eq(authenticate, false)) {
            return;
        }
        let authenticatedUser = null;
        // TODO Hack, the version of Keycloak we are using by itself is broken, we need to catch the error 'kc.login(...).success is not a function'.
        try { authenticatedUser = await keycloakService.login(); } catch (err) {
            if (_.eq(err.name, 'authentication')) {
                return setError({
                    error: true,
                    msg: 'Failed to retrieve authentication token from the Keycloak service.',
                });
            }
        }
        interceptorService.registerTokenInterceptor(request => (request.headers.Authorization = `Bearer ${keycloakService.getToken()}`));
        interceptorService.registerUnauthorizedInterceptor(logout);
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
        // If we left off at a wizard session we should always go back to it.
        if (_.eq(localStorage.getItem('$lastVisitedRoute'), '/test/wizard')) {
            if (!_.eq(historyService.getUrl(), '/test/wizard')) {
                historyService.go('/test/wizard');
            }
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
                                        authenticated && authorizationCheckerService.has('admin') && {
                                            title: 'Admin Panel',
                                            Icon: <SupervisorAccountIcon />,
                                            handler: () => {
                                                historyService.go('/admin');
                                                if (wideScreenMode && !drawerOpen) showDrawer();
                                            },
                                        },
                                        authenticated && authorizationCheckerService.has('test') && {
                                            title: 'Test',
                                            Icon: <AssignmentIcon />,
                                            handler: () => {
                                                historyService.go('/test');
                                                hideDrawer();
                                            },
                                        },
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
                        <Switch >
                            {routesAssemblerService.assemble(routes)}
                        </Switch>
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
