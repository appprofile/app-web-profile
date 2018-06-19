# base image
FROM node:8.10.0

RUN apt-get update; apt-get install -qq make gettext-base; apt-get clean

# Set working directory
RUN mkdir /app-web-profile
WORKDIR /app-web-profile
ENV APP_DIR /app-web-profile

# Add `/app-web-profile/node_modules/.bin` to $PATH
ENV PATH /app-web-profile/node_modules/.bin:$PATH

# Install and cache app-web-profile dependencies
COPY package.json /app-web-profile/package.json
RUN npm install
RUN npm install -g @angular/cli@1.7.4

# Add files.
COPY . /app-web-profile
COPY ./assets/environment.ts /.setup/
COPY ./assets/run.sh /

# Expose port.
EXPOSE 8080

# Add permissions.
RUN chmod a+x /run.sh

# Start app.
ENTRYPOINT ["/run.sh"]