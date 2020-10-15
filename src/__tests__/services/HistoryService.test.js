import service from '../../services/HistoryService';

describe('HistoryService', () => {
    test('go', () => {
        let route = '/users';
        service.go(route);
        expect(service.history.location.pathname).toEqual(route);
        route = 'admin';
        service.go(route);
        expect(service.history.location.pathname).toEqual(`/${route}`);
    });

    test('getRoutes', () => {
        expect(service.getRoutes().map(route => route.pathname)).toEqual(expect.arrayContaining([
            '/users',
            '/admin',
        ]));
    });

    test('size', () => {
        expect(service.size()).toEqual(2);
    });

    test('goBack', () => {
        const routes = ['/vocabularies', 'reading-comprehensions', '/writings'];
        for (let i = 0; i < routes.length; ++i) {
            service.go(routes[i]);
        }
        for (let i = 0; i < routes.length - 1; ++i) {
            service.goBack();
        }
        expect();
        expect(service.size()).toEqual(3);
    });

    test('getHistory', () => {
        expect(service.history).toEqual(expect.objectContaining(service.getHistory()));
    });

    test('getUrl', () => {
        const url = service.getUrl();
        expect(url).toEqual('/writings');
    });

    test('getUrlFragments', () => {
        service.go('/writings/writing/1');
        const urlFragments = service.getUrlFragments();
        expect(urlFragments).toEqual(expect.objectContaining(['writings', 'writing', '1']));
    });
});
