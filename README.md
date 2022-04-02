# Feather Fullstack Engineer Code Challenge Datastore

This repo contains code to create a datastore / API for the Feather FSE code challenge \
https://github.com/getPopsure/fullstack-engineer-challenge

The API can be viewed at https://feather-api-v1.herokuapp.com/api/v1/api-docs/

The database is deployed on Heroku as \
feather-datastore

Test data is provided by
* insertBaseData.sql / npm run insertBaseData
* Synth / npm run insertBulkData
  
Base data provides known/consistent data that helps later with UI testing \
Bulk data just provides a lot of extra records to help with UI sorting / pagination functionality

Data provided by this datastore is consumed by an ApolloGL client / React app.
Code for the ApolloGL client / React app can be found here: \
(put repo url/s here once we deploy)

## Technologies used
* Postgresql 
* Node / Express 
* Swagger / OpenAPI
* Mocha / Chai / Supertest
* Synth test data generator (getsynth.com)

## Testing
Tests are located in the /test folder. They are very basic, and can be improved with edge-case / additional functionality tests.

Run during dev / debug:
```bash
npm run test
```

Run once and exit:
```bash
npm run testOnce
```

## Getting started
Install the dependencies
```bash
npm install
```
Create the database by using the Postgresql client of your choice \
database name: feather_fullstack_code_challenge

Create database tables
```bash
npm run createDB
```

Insert base data
```bash
npm run insertBaseData
```

Generate bulk data \
(You will need to install / configre Synth)
```bash
npm run insertBulkData
```
This will generate some warnings in the console. These warnings involve integer type discrepancies, and can be ignored.

You will need the following .env variables for the database:
```bash
DATABASE_USER_NAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=feather_fullstack_code_challenge 
DATABASE_HOSTNAME=localhost
DATABASE_PORT=5432 
```

Start the app in dev mode (nodemon)
```bash
npm run dev
```

Start the app (node)
```bash
npm run start
```

## To Do
* Everything can always be better.
* Columns names could be lowerCamelCase instead of hyphen_format

