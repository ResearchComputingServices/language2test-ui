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
                authorization,
                authorizations,
                authorizationOperator,
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
            if (_.isString(authorization)) {
                auth.push(authorization);
            }
            if (_.isArray(authorizations)) {
                auth.concat(authorizations);
            }
            auth = _.uniq(auth);
            const options = _.isNil(authorizationOperator) ? undefined : authorizationOperator;
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
