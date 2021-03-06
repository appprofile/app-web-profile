// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  publichost: '25.85.82.83:8080',
  auth0: {
    domain: 'app-profile.auth0.com',
    clientid: 'lUnF8NKF9FBehcR3YcAxe4z0HQo3C2z3',
    audience: '',
    callback: 'callback',
    scope: 'openid profile email'
  },
  api: {
    domain: '25.85.82.83',
    port: '8081',
    version: 'v1'
  }
};
