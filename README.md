<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Documentation

(sometimes it goes offline)

```bash
https://qrmenu-backend-prod.vercel.app/api/
```

# How to run this

<span>Node > v21.5.0</span>

<span>Docker > v24.0.7 + docker compose</span>

### environment variables
```bash 
cp .env_sample .env
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
http://localhost:3005/api
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

# running e2e tests with watch and coverage
$ npm run test:e2e:watch:cov
```

### To generate a new module nestjs (for development only)

```bash
$ nest g res {moduleName} --no-spec
# ex: nest g res user --no-spec
```
