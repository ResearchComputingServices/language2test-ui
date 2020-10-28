import _ from 'lodash';
import store from '../redux/store';

class RolesCheckerService {
    allowedOperators = {
        and: _.every,
        or: _.some,
    };

    constructor(roles) {
        const initializeAuthorization = roles => {
            const mappedAuthorizations = [];
            _.each(roles, role => {
                role = _.get(role, 'name');
                role && mappedAuthorizations.push(role);
            });
            return mappedAuthorizations;
        };
        this.roles = new Set(
            _.isArray(roles)
                ? initializeAuthorization(roles)
                : initializeAuthorization(this.get()),
        );
    }

    has(role, options) {
        const operator = _.get(options, 'operator', 'or');
        let roles = role;
        if (!(operator in this.allowedOperators)) {
            throw new Error('Invalid operator props');
        }
        if (_.isString(role)) {
            roles = [role];
        }
        if (roles.includes('*')) return true;
        const mappedOperatorFunc = this.allowedOperators[operator];
        return mappedOperatorFunc(roles, perm => this.roles.has(perm));
    }

    includes(...args) {
        return this.has(...args);
    }

    contains(...args) {
        return this.has(...args);
    }

    get() {
        return _.get(store.getState(), 'userSession.roles');
    }
}

const rolesCheckerService = new RolesCheckerService();

Object.freeze(rolesCheckerService);

export default rolesCheckerService;

export { RolesCheckerService };
