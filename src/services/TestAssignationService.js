import RestService from './RestService';

class TestAssignation extends RestService {
    prefix = `${this.prefix}/test_assignation`;

    get = this._get;

    add = this._add;

    update = this._update;

    remove = this._remove;

    count = this._count;
}

const testAssignationService = new TestAssignation();

Object.freeze(testAssignationService);

export default testAssignationService;

export { testAssignationService };
