import axios from 'axios';
import RestService from './RestService';

class FileUploadService extends RestService {
    prefix = `${this.prefix}/images`

    upload(file, name) {
        const formData = new FormData();
        formData.append('file', file[0]);
        formData.append('name', name);
        const config = { headers: { 'content-type': 'multipart/form-data' } };
        return axios.post(this.prefix, formData, config);
    }

    download(fileName) {
        return axios.get(`${this.prefix}?name=${fileName}`, { responseType: 'blob' });
    }
}

const fileUploadService = new FileUploadService();

Object.freeze(fileUploadService);

export default fileUploadService;

export { FileUploadService };
