import RestService from './RestService';

class TestCategoryService extends RestService {
    prefix = `${this.prefix}/test_categories`

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    export = this._export;

    count = this._count;
}

const testCategoryService = new TestCategoryService();

Object.freeze(testCategoryService);

export default testCategoryService;

export { TestCategoryService };
