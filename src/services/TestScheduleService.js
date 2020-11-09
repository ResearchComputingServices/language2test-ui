import axios from 'axios';
import RestService from './RestService';

class TestScheduleService extends RestService {
    prefix = `${this.prefix}/test_schedule`;

    getTestTakerSchedule = (start, end) => axios
        .get(`${this.prefix}/test_taker`, {
            params: {
                start_datetime: start.toISOString(),
                end_datetime: end.toISOString(),
            },
        }).then(res => res.data)

    getInstructorSchedule = (start, end) => axios
        .get(`${this.prefix}/instructor`, {
            params: {
                start_datetime: start.toISOString(),
                end_datetime: end.toISOString(),
            },
        })
        .then(res => res.data)
}

const testScheduleService = new TestScheduleService();

Object.freeze(testScheduleService);

export default testScheduleService;

export { testScheduleService };
