import administratorAuthorizations from '../authorizations/administrator.json';

export default {
    id: 1,
    address: null,
    education: null,
    email: null,
    firstLanguage: null,
    firstName: 'Administrator',
    lastName: 'User',
    displayName: 'Administrator User',
    name: 'Administrator',
    phone: null,
    roles: [{
        name: 'Administrator',
        authorizations: administratorAuthorizations,
    }],
    studentId: null,
    authenticated: true,
};
