import moment from 'moment';
import RestService from './RestService';

class TestAssignation extends RestService {
    prefix = `${this.prefix}/test_assignation`;

    _responseTransformer(data) {
        if (data.startDatetime) {
            data.startDatetime = moment.utc(data.startDatetime).local().toISOString();
        }
        if (data.endDatetime) {
            data.endDatetime = moment.utc(data.endDatetime).local().toISOString();
        }
        return data;
    }

    _requestTransformer(data) {
        if (data.startDatetime instanceof moment) {
            data.startDatetime = data.startDatetime.toISOString();
        }
        if (data.endDatetime instanceof moment) {
            data.endDatetime = data.endDatetime.toISOString();
        }
        return data;
    }

    get = data => this._get(data, { responseTransformers: [this._responseTransformer] });

    add = data => this._add(data, { requestTransformers: [this._requestTransformer] });

    update = data => this._update(data, { requestTransformers: [this._requestTransformer] });

    remove = this._remove;

    count = this._count;

    export = this._export;
}

const testAssignationService = new TestAssignation();

Object.freeze(testAssignationService);

export default testAssignationService;

export { testAssignationService };
