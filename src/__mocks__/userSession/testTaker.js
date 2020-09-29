import testTakerAuthorizations from '../authorizations/testTaker.json';

export default {
    id: 1,
    address: null,
    education: null,
    email: null,
    firstLanguage: null,
    firstName: 'Test Taker',
    lastName: 'User',
    name: 'Test Taker',
    displayName: 'Test Taker User',
    phone: null,
    roles: [{
        name: 'Test Taker',
        authorizations: testTakerAuthorizations,
    }],
    studentId: null,
    authenticated: true,
};
