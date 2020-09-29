import { createBrowserHistory } from 'history';
import _ from 'lodash';

class InterceptorService {
    history = createBrowserHistory()

    constructor() {
        this.history.listen(location => localStorage.setItem('$lastVisitedRoute', location.pathname));
    }

    getHistory = () => this.history;

    getUrl = () => _.get(this, 'history.location.pathname');

    getUrlFragments = () => _.compact(this.getUrl().split('/'));

    go = route => this.history.push(route);

    goBack = () => this.history.goBack();

    size = () => this.history.length;
}

const interceptorService = new InterceptorService();

Object.freeze(interceptorService);

export default interceptorService;

export { InterceptorService };
