import _ from 'lodash';
import RestService from './RestService';

class UserService extends RestService {
    prefix = `${this.prefix}/users`;

    _responseTransformer(data) {
        if (_.isArray(data)) {
            _.each(data, datum => {
                delete datum.roles;
            });
        } else {
            delete data.roles;
        }
        return data;
    }

    _requestTransformer(data) {
        if (_.isEmpty(data.fields) || _.isNil(data.fields)) {
            data.fields = [];
        }
        return data;
    }

    get = query => this._get({
        ...query,
        ...(query.id
            ? {}
            : { roles: 'Test Taker' }),
    }, {
        responseTransformers: [
            this._responseTransformer,
        ],
    });

    add = data => this._add(data, {
        responseTransformers: [
            this._responseTransformer,
        ],
        requestTransformers: [
            this._requestTransformer,
        ],
    })

    update = data => this._update(data, {
        responseTransformers: [
            this._responseTransformer,
        ],
        requestTransformers: [
            this._requestTransformer,
        ],
    })

    remove = this._remove;

    count = () => this._count({ roles: 'Test Taker' });
}

const userService = new UserService();

Object.freeze(userService);

export default userService;

export { UserService };
