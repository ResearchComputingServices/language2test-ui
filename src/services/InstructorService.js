import axios from 'axios';
import _ from 'lodash';
import RestService from './RestService';

class InstructorService extends RestService {
    prefix = `${this.prefix}/instructor`

    getClasses = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/student_classes`,
        }))
        .then(data => this._processResponse(data, options))

    getStudents = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/students`,
        }))
        .then(data => this._processResponse(data, options))

    getClassesCount = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/student_classes/count`,
        }))
        .then(data => this._processResponse(data, options))

    getStudentsCount = (query, options = {}) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/students/count`,
        }))
        .then(data => this._processResponse(data, options))

    getTestSessionsCount = id => axios
        .get(this._buildQuery({
            url: `${this.prefix}/test_sessions/count`,
            test_assignation_id: id,
        }))
        .then(data => this._processResponse(data, {}))

    getTestSessions = (id, query) => axios
        .get(this._buildQuery({
            ...query,
            url: `${this.prefix}/test_sessions`,
            test_assignation_id: id,
        }))
        .then(data => this._processResponse(data, {}))

    importStudentClasses = (data, options = {}) => {
        const formData = new FormData();
        formData.append('file', data.file[0]);
        formData.append('name', data.name);
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            responseType: 'arraybuffer',
        };
        return axios
            .post(`${this.prefix}/student_classes/upload`, formData, config)
            .then(data => this._processResponse(data, options));
    }

    exportTestSessions = (id, options = {}) => {
        let url = `${this.prefix}/test_sessions/export`;
        url = !_.isNil(id) ? `${url}?test_assignation_id=${id}` : url;
        const config = {
            responseType: 'arraybuffer',
            headers: { 'Content-Type': 'blob' },
        };
        return axios
            .get(url, config)
            .then(data => this._processResponse(data, options));
    }
}

const instructorService = new InstructorService();

Object.freeze(instructorService);

export default instructorService;
