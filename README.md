<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# How to run this

<a href="https://nodejs.org/en" style="display: flex; align-items: center; cursor: pointer;">
<img style="margin-right: 20px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height="80"/>
<span>v21.5.0</span>
</a>

<a href="https://nodejs.org/en" style="display: flex; align-items: center; cursor: pointer;">
<img style="margin-right: 20px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" height="40"/>
<span>v24.0.7 + docker compose</span>
</a>

### Environment variables needed to run the project locally

```bash
#DataBase conection

#Where to get it: docker-compose.yml
DATABASE_USERNAME=''
DATABASE_PASSWORD=''

```

```bash

#Firebase auth keys (mandatory to auth middleware)
#Where to get it:
#step 1: create a new Firebase project if you don't have (https://console.firebase.google.com/u/1/)
#step 2: go to the project configuration > general > service account > generate a new private key
#step 3: copy the keys

FIREBASE_CLIENT_UNIVERSE_DOMAIN=
FIREBASE_CLIENT_x509_CERT_URL=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_URI=
FIREBASE_CLIENT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PROJECT_ID=
FIREBASE_TYPE=
FIREBASE_PRIVATE_KEY=

```

### Environment variables mandatory to run e2e tests suite

```bash

#Firebase auth keys

#Where to get it:
#step 1: create a new Firebase project if you don't have (https://console.firebase.google.com/u/1/)
#step 2: go to the project configuration > general
#step 3: copy the keys

FIREBASE_APP_API_KEY=
FIREBASE_APP_AUTH_DOMAIN=
FIREBASE_APP_PROJECT_ID=
FIREBASE_APP_STORAGE_BUCKET=
FIREBASE_APP_MESSAGING_SENDER_ID=
FIREBASE_APP_APP_ID=
FIREBASE_APP_MEASUREMENT_ID=

```

```bash

#User credentials

#Where to get it:
#step 1: create a new Firebase project if you don't have (https://console.firebase.google.com/u/1/)
#step 2: go to the project > Authentication > create a new user
#step 3: copy the email and password

USER_EMAIL=
USER_PASSWORD=

```

### Installing dependencies

```bash
$ npm install
```

### Running Database

```bash
# migrations
$ docker compose up -d
```

### Running Migrations

```bash
# migrations
$ npx sequelize-cli db:migrate
```

### Running the app

```bash
# development
$ npm run start

# watch mode (recommended to local)
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Check if the app is running in localhost

```bash
# put this in your browser for see the project running
http://localhost:3005/

# put this in your browser for see the openapi documentation
http://localhost:3005/api-documentation
```

### Running Test (Optional)

```bash
# running unit tests
$ npm run test:unit

# running unit tests with watch
$ npm run test:unit:watch

# running unit tests with cov
$ npm run test:unit:cov

# running unit tests with debug
$ npm run test:unit:debug

# running unit tests with watch and coverage
$ npm run test:unit:watch:cov


#Obs: Before running the e2e tests you need to run the project, for example, with the command > npm run start:dev.

# running e2e tests
$ npm run test:e2e

# running e2e test with watch
$ npm run test:e2e:watch
```

### To generate a new module nestjs (for development only)

```bash
$ nest g res {moduleName} --no-spec
# ex: nest g res user --no-spec
```
