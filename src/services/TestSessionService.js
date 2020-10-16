import RestService from './RestService';

class UserService extends RestService {
    prefix = `${this.prefix}/test_sessions`;

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    export = this._export;

    count = this._count;
}

const userService = new UserService();

Object.freeze(userService);

export default userService;

export { userService };
