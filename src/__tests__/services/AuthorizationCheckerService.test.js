import { authorizationChecker as authorizationCheckerProvider } from '../../providers';

describe('AuthorizationCheckerService', () => {
    let authorizationChecker;

    beforeEach(() => {
        authorizationChecker = authorizationCheckerProvider([
            { name: 'create_user' },
            { name: 'create_user' },
            { name: 'read_user' },
            { name: 'update_user' },
            { name: 'delete_user' },
        ]);
    });

    test('should be able to query roles passed as a string to the "has" method', () => {
        expect(authorizationChecker.has('create_user')).toBe(true);
        expect(authorizationChecker.has('read_user')).toBe(true);
        expect(authorizationChecker.has('update_user')).toBe(true);
        expect(authorizationChecker.has('delete_user')).toBe(true);
    });

    test('should be able to take in multiple items chained as an or when "has" method is called', () => {
        expect(authorizationChecker.has(['create_user', 'read_user', 'update_user', 'delete_user'])).toBe(true);
    });

    test('should return false if "has" method argument has one element missing in the set by default', () => {
        expect(authorizationChecker.has(['create_user', 'read_user', 'destroy_user'])).toBe(false);
    });

    test('should return true if "has" method argument has one element missing when operator is "or"', () => {
        expect(authorizationChecker.has(['create_user', 'read_user', 'destroy_user'], { operator: 'or' })).toBe(true);
    });

    test('should return false if "has" method argument has one element missing when operator is "and"', () => {
        expect(authorizationChecker.has(['create_user', 'read_user', 'destroy_user', 'something_made_up'], { operator: 'and' })).toBe(false);
    });

    test('should be able to query roles passed as an array to the "has" method', () => {
        expect(authorizationChecker.has(['create_user'])).toBe(true);
    });

    test('should return false when "has" method is called on a query that is not preset in the set', () => {
        expect(authorizationChecker.has(['enhilate_user'])).toBe(false);
        expect(authorizationChecker.has('destroy_user')).toBe(false);
    });

    test('will show that the "include"s and "contains" method replicates the "has" method', () => {
        expect(authorizationChecker.has('create_user')).toBe(true);
        expect(authorizationChecker.includes('create_user')).toBe(true);
        expect(authorizationChecker.contains('create_user')).toBe(true);
        expect(authorizationChecker.has(['create_user', 'read_user'])).toBe(true);
        expect(authorizationChecker.includes(['create_user', 'read_user'])).toBe(true);
        expect(authorizationChecker.contains(['create_user', 'read_user'])).toBe(true);
        expect(authorizationChecker.has(['enhilate_user'])).toBe(false);
        expect(authorizationChecker.includes(['enhilate_user'])).toBe(false);
        expect(authorizationChecker.contains(['enhilate_user'])).toBe(false);
        expect(authorizationChecker.has(['create_user', 'read_user', 'destroy_user'], { operator: 'or' })).toBe(true);
        expect(authorizationChecker.includes(['create_user', 'read_user', 'destroy_user'], { operator: 'or' })).toBe(true);
        expect(authorizationChecker.contains(['create_user', 'read_user', 'destroy_user'], { operator: 'or' })).toBe(true);
    });

    test('should return true if "has" method is passed an empty array', () => {
        expect(authorizationChecker.has([])).toBe(true);
    });
});
