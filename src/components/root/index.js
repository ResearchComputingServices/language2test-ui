import React from 'react';
import { Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import _ from 'lodash';
import { Provider } from 'react-redux';
import Main from '../main';
import store from '../../redux/store';
import sassTheme from './_theme.scss';
import { useService } from '../../hooks';

let theme = null;

if (_.isObject(sassTheme)) {
    theme = createMuiTheme({
        palette: {
            primary: {
                main: sassTheme.primary,
                contrastText: sassTheme.fontColor,
            },
            secondary: {
                main: sassTheme.secondary,
                contrastText: sassTheme.fontColor,
            },
        },
    });
}

try {
    const req = require.context('../', true, /\.scss$/);
    req.keys().forEach(key => {
        req(key);
    });
} catch (err) {}

export default function() {
    const historyService = useService('history');
    const App = () => (
        <Provider store={store}>
            <Router history={historyService.getHistory()}>
                <Main />
            </Router>
        </Provider>
    );
    return (
        theme
            ? (
                <MuiThemeProvider theme={theme}>
                    <App />
                </MuiThemeProvider>
            )
            : <App />
    );
}
