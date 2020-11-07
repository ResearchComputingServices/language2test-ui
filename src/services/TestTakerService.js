import axios from 'axios';
import RestService from './RestService';

class TestTakerService extends RestService {
    prefix = `${this.prefix}/test_taker`

    getClasses = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/student_classes`,
        }))
        .then(data => this._processResponse(data, options))

    getClassesCount = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/student_classes/count`,
        }))
        .then(data => this._processResponse(data, options))
}

const testTakerService = new TestTakerService();

Object.freeze(testTakerService);

export default testTakerService;
