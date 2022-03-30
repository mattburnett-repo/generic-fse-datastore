# Feather Fullstack Engineer Code Challenge Datastore

This repo contains code to create a datastore / API for the Feather FSE code challenge \
https://github.com/getPopsure/fullstack-engineer-challenge

The API can be viewed at \
feather-datastore
(put url here once we deploy)

Data provided by this datastore is consumed by an ApolloGL client / React app.
Code for the ApolloGL client / React app can be found here: \
(put repo url/s here once we deploy)

## Technologies used
* Postgresql 
* Node / Express 
* Swagger / OpenAPI
* Mocha / Chai / Supertest

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

Insert data
```bash
npm run insertData
```

You will need the following .env variables \
DATABASE_USER_NAME= \
DATABASE_PASSWORD= \
DATABASE_NAME=feather_fullstack_code_challenge \
DATABASE_HEROKU_APP_NAME= \
DATABASE_HEROKU_DATABASE_NAME= \
DATABASE_HEROKU_URL: \
DATABASE_HOSTNAME= \
DATABASE_PORT= 

REACT_APP_APP_BASE_URL=

Start the app
```bash
npm run start
```

## To Do
* Everything can always be better.

