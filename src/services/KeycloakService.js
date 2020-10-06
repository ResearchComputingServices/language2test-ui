import Keycloak from 'keycloak-js';
import ClientConfig from '../client-configurations';

const clientConfig = new ClientConfig();

class KeycloakService {
    constructor() {
        const protocol = clientConfig.isHTTPS() ? 'https' : 'http';
        this._keycloakAuth = Keycloak({
            realm: clientConfig.getRealm(),
            clientId: clientConfig.getClient(),
            resource: clientConfig.getClient(),
            'auth-server-url': `${protocol}://${clientConfig.getServer()}:${clientConfig.getPort()}/auth`,
            url: `${protocol}://${clientConfig.getServer()}:${clientConfig.getPort()}/auth`,
            'ssl-required': clientConfig.isHTTPS() ? 'external-requests' : 'none',
            credentials: { secret: clientConfig.getSecret() },
            'enable-cors': true,
            'confidential-port': 0,
        });
    }

    getToken = () => this._keycloakAuth.token

    getUser = () => this._keycloakAuth.loadUserProfile()

    getUserRole = () => {
        const roleObject = this._keycloakAuth.realmAccess;
        const { roles } = typeof roleObject === 'object'
            && roleObject;
        return roles || [];
    }

    login = async () => {
        const authenticated = await this._keycloakAuth.init({
            onLoad: 'login-required',
            promiseType: 'native',
            checkLoginIframe: false,
        });
        if (!authenticated) {
            const authError = new Error();
            authError.name = 'authentication';
            authError.message = 'Failed to authenticate user';
            throw authError;
        }
        const user = await this.getUser();
        user.roles = this.getUserRole();
        return user;
    }

    logout = async () => this._keycloakAuth.logout();
}

const keycloakService = new KeycloakService();

Object.freeze(keycloakService);

export default keycloakService;

export { KeycloakService };
