/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import React from 'react';
import { shallow, mount as mountComponent } from 'enzyme';
import { Router } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import _ from 'lodash';
import historyService from './services/HistoryService';
import { reducers } from './redux/slices';

const mockStore = configureMockStore({ reducers });

function WrapperComponent({ propsFunc, children, Component }) {
    const props = propsFunc();
    return (
        <Component
            children={children}
            {...props}
        />
    );
}

export function createTest(Component, opts = {}, callback) {
    let { props, children, mount, state } = opts;
    if (_.isNil(props)) props = {};
    if (_.isNil(children)) children = null;
    if (mount) {
        return () => {
            state = state || {};
            const mockMath = Object.create(global.Math);
            mockMath.random = () => 0.5;
            global.Math = mockMath;
            const mountedTree = mountComponent((
                <Router history={historyService.getHistory()}>
                    <Provider store={mockStore({ ...state })}>
                        <Component {...props} >
                            {children}
                        </Component>
                    </Provider>
                </Router>));
            _.isFunction(callback) && callback(mountedTree);
        };
    }
    if (_.isFunction(props)) {
        return () => {
            const shallowTree = shallow(
                <WrapperComponent
                    Component={Component}
                    propsFunc={props}
                >
                    {children}
                </WrapperComponent>,
            ).dive();
            _.isFunction(callback) && callback(shallowTree);
        };
    }
    return () => {
        const shallowTree = shallow((
            <Component {...props} >
                {children}
            </Component>
        ));
        _.isFunction(callback) && callback(shallowTree);
    };
}

export function createSnapshotTest(Component, opts = {}) {
    return createTest(Component, opts, tree => expect(toJSON(tree)).toMatchSnapshot());
}
