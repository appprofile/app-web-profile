import { writeFile } from 'fs';
import { argv } from 'yargs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file.
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --configuration=dev`
// we get it from yargs's argv object.
const configuration = argv.configuration;
const isProd = configuration === 'prod';

const targetPath = `./src/environments/environment.${configuration}.ts`;
const envConfigFile = `export const environment = {	
  production: ${isProd},
  supportedLanguages: ['es'],
  auth0: {
    domain: "${process.env.AUTH0_DOMAIN}",
    clientid: "${process.env.API_CLIENT_ID}",
    audience: "${process.env.API_AUDIENCE}",
    callback: "${process.env.CALLBACK}",
    scope: "${process.env.SCOPE}"
  },
  api: {
    domain: "${process.env.API_DOMAIN}",
    port: "${process.env.API_PORT}",
    version: "${process.env.API_VERSION}"
  }
};
`
writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.log(err);
    }

    console.log(`Output generated at ${targetPath}`);
});