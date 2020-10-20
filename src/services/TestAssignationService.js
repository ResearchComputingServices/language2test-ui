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

    getSchedule = () => [
        {
            endDatetime: 'Thu, 22 Oct 2020 01:24:00 GMT',
            startDatetime: 'Sun, 18 Oct 2020 13:24:00 GMT',
            studentClassId: 1,
            studentClassName: 'level_1_class_1_fall',
            taken: true,
            testAssignationId: 1,
            testId: 1,
            testName: 'Beginner',
        },
        {
            endDatetime: 'Sun, 25 Oct 2020 01:25:00 GMT',
            startDatetime: 'Thu, 22 Oct 2020 13:25:00 GMT',
            studentClassId: 2,
            studentClassName: 'level_1_class_1_winter',
            taken: false,
            testAssignationId: 2,
            testId: 1,
            testName: 'Beginner',
        },
        {
            endDatetime: 'Wed, 21 Oct 2020 01:27:00 GMT',
            startDatetime: 'Tue, 20 Oct 2020 01:27:25 GMT',
            studentClassId: 2,
            studentClassName: 'level_1_class_1_winter',
            taken: false,
            testAssignationId: 3,
            testId: 2,
            testName: 'Intermediate',
        },
    ]

    remove = this._remove;

    count = this._count;
}

const testAssignationService = new TestAssignation();

Object.freeze(testAssignationService);

export default testAssignationService;

export { testAssignationService };
