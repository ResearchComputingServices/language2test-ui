import RestService from './RestService';

class TestTypeService extends RestService {
    prefix = `${this.prefix}/test_types`

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    export = this._export;

    count = this._count;
}

const testTypeService = new TestTypeService();

Object.freeze(testTypeService);

export default testTypeService;

export { testTypeService };
