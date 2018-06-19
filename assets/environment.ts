export const environment = {
    production: true,
    publichost: '${PUBLIC_HOST}',
    auth0: {
        domain: '${AUTH0_DOMAIN}',
        clientid: '${AUTH0_CLIENT_ID}',
        audience: '',
        callback: '${CALLBACK}',
        scope: '${SCOPE}'
    },
    api: {
        domain: '${API_DOMAIN}',
        port: '${API_PORT}',
        version: '${API_VERSION}'
    }
};
