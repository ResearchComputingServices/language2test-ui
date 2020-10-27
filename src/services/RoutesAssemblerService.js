import React from 'react';
import _ from 'lodash';
import { Route, Redirect } from 'react-router-dom';
import historyService from './HistoryService';
import { rolesChecker } from '../providers';

class RoutesAssemblerService {
    assemble(routes) {
        const routeComponents = [];
        const rolesCheckerService = rolesChecker();
        _.each(routes, route => {
            const {
                path,
                component,
                roles,
                operator,
                redirect,
                conditional,
                exact,
            } = route;
            const isExact = _.isBoolean(exact) ? exact : true;
            if (_.isFunction(conditional)) {
                routeComponents.push(<Route
                    key={path}
                    component={conditional({ rolesCheckerService, historyService })}
                    exact={isExact}
                    path={path}
                />);
                return true;
            }
            let auth = [];
            if (_.isString(roles)) {
                auth.push(roles);
            }
            if (_.isArray(roles)) {
                auth = auth.concat(roles);
            }
            auth = _.uniq(auth);
            const options = _.isNil(operator) ? undefined : operator;
            if (!_.isNil(redirect)) {
                rolesCheckerService.contains(auth, options)
                    ? routeComponents.push(<Route
                        key={path}
                        component={component}
                        exact={isExact}
                        path={path}
                    />)
                    : routeComponents.push(<Redirect
                        key={path}
                        exact={isExact}
                        to={redirect}
                    />);
            } else {
                rolesCheckerService.contains(auth, options) && routeComponents.push(<Route
                    key={path}
                    component={component}
                    exact={isExact}
                    path={path}
                />);
            }
        });
        return routeComponents;
    }
}

const routesAssemblerService = new RoutesAssemblerService();

Object.freeze(routesAssemblerService);

export default routesAssemblerService;

export { RoutesAssemblerService };
