import axios from 'axios';
import RestService from './RestService';

class TestScheduleService extends RestService {
    prefix = `${this.prefix}/test_schedule`;

    get = (start, end) => axios.get(`${this.prefix}`, {
        params: {
            start_datetime: start.toISOString(),
            end_datetime: end.toISOString(),
        },
    }).then(res => res.data)
}

const testScheduleService = new TestScheduleService();

Object.freeze(testScheduleService);

export default testScheduleService;

export { testScheduleService };
