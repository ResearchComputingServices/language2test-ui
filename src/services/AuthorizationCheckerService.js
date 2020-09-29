import _ from 'lodash';
import store from '../redux/store';

class AuthorizationCheckerService {
    allowedOperators = {
        and: _.every,
        or: _.some,
    };

    constructor(authorizations) {
        const initializeAuthorization = authorizations => {
            const mappedAuthorizations = [];
            _.each(authorizations, authorization => {
                authorization = _.get(authorization, 'name');
                authorization && mappedAuthorizations.push(authorization);
            });
            return mappedAuthorizations;
        };
        this.authorizations = new Set(
            _.isArray(authorizations)
                ? initializeAuthorization(authorizations)
                : initializeAuthorization(this.get()),
        );
    }

    has(authorization, options) {
        const operator = _.get(options, 'operator', 'and');
        let authorizations = authorization;
        if (!(operator in this.allowedOperators)) {
            throw new Error('Invalid operator props');
        }
        if (_.isString(authorization)) {
            authorizations = [authorization];
        }
        const mappedOperatorFunc = this.allowedOperators[operator];
        return mappedOperatorFunc(authorizations, perm => this.authorizations.has(perm));
    }

    includes(...args) {
        return this.has(...args);
    }

    contains(...args) {
        return this.has(...args);
    }

    get() {
        let authorizations = [];
        const roles = _.get(store.getState(), 'userSession.roles');
        _.each(roles, role => (authorizations = authorizations.concat(role.authorizations)));
        return authorizations;
    }
}

// TODO - Need to remove
const authorizationCheckerService = new AuthorizationCheckerService();

Object.freeze(authorizationCheckerService);

export default authorizationCheckerService;

export { AuthorizationCheckerService };
