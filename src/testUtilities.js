/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render as testingLibraryRender } from '@testing-library/react';
import historyService from './services/HistoryService';
import reduxStore from './redux/store';

export function render(children) {
    return testingLibraryRender((
        <Provider store={reduxStore}>
            <Router history={historyService.getHistory()}>
                {children}
            </Router>
        </Provider>
    ));
}
