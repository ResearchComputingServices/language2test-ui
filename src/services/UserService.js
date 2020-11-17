import _ from 'lodash';
import axios from 'axios';
import RestService from './RestService';

class UserService extends RestService {
    prefix = `${this.prefix}/users`;

    _addDefaultRoles(data) {
        if (_.isEmpty(data.roles) || _.isNil(data.roles)) {
            data.roles = ['Test Taker'];
        }
        return data;
    }

    _addDefaultFields(data) {
        if (_.isEmpty(data.fields) || _.isNil(data.fields)) {
            data.fields = [];
        }
        return data;
    }

    _parseRoles(data) {
        if (_.isArray(data)) {
            return data.map(user => {
                user.roles = _.map(user.roles, role => ({ name: role }));
                return user;
            });
        }
        data.roles = _.map(data.roles, role => {
            if (!_.isObject(role)) {
                return { name: role };
            }
            return role;
        });
        return data;
    }

    login = () => axios.get(`${this.prefix}/login`).then(res => res.data)

    get = this._get;

    add = data => this._add(data, {
        requestTransformers: [
            this._addDefaultRoles,
            this._addDefaultFields,
            this._parseRoles,
        ],
    })

    update = data => this._update(data, {
        requestTransformers: [
            this._addDefaultRoles,
            this._addDefaultFields,
            this._parseRoles,
        ],
    })

    // TODO In backend and in front-end this needs to be changed to updateProfile
    updateDemographicQuestionnaire = data => {
        const options = {
            requestTransformers: [
                this._addDefaultRoles,
                this._addDefaultFields,
                this._parseRoles,
            ],
        };
        return axios
            // Needs to be changed to profile
            .put(`${this.prefix}/demographic_questionnaire`, this._processRequest(data, options))
            .then(data => this._processResponse(data, options));
    };

    setTemporaryPassword = (id, password) => axios.put(`${this.prefix}/reset_keycloak_password`, { id, password })

    remove = this._remove;

    export = this._export;

    import = this._import;

    count = this._count;
}

const userService = new UserService();

Object.freeze(userService);

export default userService;

export { UserService };
