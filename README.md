# AppWebProfile

## Development server

### Run with Docker

Run `docker build -t app-web-profile .` to build the image.

Run `docker-compose up` to execute. 

### Run with ng

Run `ng serve --port 8080 --public {PUBLIC_HOST}` for a dev server. Navigate to `http://{PUBLIC_HOST}:8080/`. The app will automatically reload if you change any of the source files.

**NOTE:** Make sure you have exposed to port using [localtunnel](https://github.com/localtunnel/localtunnel). Once you have installed run `lt --port 8080 -s appwebprofile -o` to expose. 

## Development

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
