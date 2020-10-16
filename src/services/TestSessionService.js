import RestService from './RestService';

class TestSessionService extends RestService {
    prefix = `${this.prefix}/test_sessions`;

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    export = this._export;

    count = this._count;
}

const testSessionService = new TestSessionService();

Object.freeze(testSessionService);

export default testSessionService;

export { testSessionService };
