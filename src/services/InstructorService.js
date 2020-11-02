import axios from 'axios';
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
}

const instructorService = new InstructorService();

Object.freeze(instructorService);

export default instructorService;
