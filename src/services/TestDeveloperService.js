import axios from 'axios';
import RestService from './RestService';

class TestDeveloperService extends RestService {
    prefix = `${this.prefix}/test_developer`

    getTestsWithSessions = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/test_with_sessions`,
        }))
        .then(data => this._processResponse(data, options))

    getTestsWithSessionsCount = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/test_with_sessions/count`,
        }))
        .then(data => this._processResponse(data, options))

    getUpcomingTests = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/upcoming_tests`,
        }))
        .then(data => this._processResponse(data, options))

    getUpcomingTestsCount = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/upcoming_tests/count`,
        }))
        .then(data => this._processResponse(data, options))

    getClonedTests = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/cloned_tests`,
        }))
        .then(data => this._processResponse(data, options))

    getClonedTestsCount = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/cloned_tests/count`,
        }))
        .then(data => this._processResponse(data, options))

    getTestsNotInUse = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/test_not_in_use`,
        }))
        .then(data => this._processResponse(data, options))

    getTestsNotInUseCount = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/test_not_in_use/count`,
        }))
        .then(data => this._processResponse(data, options))
}

const instructorService = new TestDeveloperService();

Object.freeze(instructorService);

export default instructorService;
