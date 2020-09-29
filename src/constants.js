import ClientConfig from './client-configurations';

const clientConfig = new ClientConfig();

const constants = {
    API_PREFIX_URL: clientConfig.getApi(),
    DEFAULT_CONFIG: {
        phoneNumberMask: '(999) 999 9999',
        locale: 'en_US',
    },
};

export default constants;
