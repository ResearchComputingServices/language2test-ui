import mock from './mock';
import store from './store';

export default process.env.NODE_ENV === 'test' ? mock : store;
