import axios from 'axios';
import RestService from './RestService';

class TestScheduleService extends RestService {
    basePrefix = `${this.prefix}`;

    prefix = `${this.prefix}/test_schedule`;

    // TODO routes will change in the future.
    getTestTakerSchedule = (start, end) => axios.get(`${this.prefix}`, {
        params: {
            start_datetime: start.toISOString(),
            end_datetime: end.toISOString(),
        },
    }).then(res => res.data)

    // TODO routes will change in the future.
    // eslint-disable-next-line no-unused-vars
    getInstructorSchedule = (start, end) => axios
        .get(`${this.basePrefix}/instructor/test_assignation`)
        .then(res => res.data)
}

const testScheduleService = new TestScheduleService();

Object.freeze(testScheduleService);

export default testScheduleService;

export { testScheduleService };
