
-- create postgresql database as data store

-- psql postgres -d feather_fullstack_code_challenge -f ./db/createDatabase.sql
-- or: npm run createDB

-- *** Create database in Postbird / some other Postgres tool of choice. ***
--      trying to run CREATE DATABASE commands in this file, ie -> psql postgres -d feather_fullstack_code_challenge -f -a ./db/createDatabase.sql
--          results in error -> psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: FATAL:  database "feather_fullstack_code_challenge" does not exist
--      trying to fix this with various permutations of command line args results in more errors that just don't make sense
--          and is taking too much time to resolve

-- Run insertBaseData.sql to create basic records. UI testing expects this data to be in the database
-- Run on command line
--      synth generate db/synthTemplates --to postgres://postgres:postgress@localhost:5432/feather_fullstack_code_challenge
--      OR
--      npm run insertBulkData
--  to generate filler data
--  *** THIS WILL GENERATE SOME WARNINGS ABOUT INTEGER TYPES. YOU CAN IGNORE THESE

-- HEROKU CLI: push database changes to Heroku server after running this create script and the insert script/s
--      *** this pushes local version of db to heroku, so locally do creates / inserts before these two ***
-- 1). heroku heroku pg:reset --app feather-datastore
--      or: npm run herokuDbReset
-- 2). heroku pg:push feather_fullstack_code_challenge DATABASE_URL --app feather-datastore
--      or: npm run herokuDbPush

BEGIN;

DROP TABLE IF EXISTS policy CASCADE;
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS provider CASCADE;
DROP TABLE IF EXISTS insurance_type CASCADE;
DROP TABLE IF EXISTS policy_status CASCADE;

CREATE TABLE policy
(
    id SERIAL PRIMARY KEY,
    customer_id integer NOT NULL,
    provider_id integer NOT NULL,
    insurance_type_id integer NOT NULL,
    status_id integer NOT NULL,
    policy_number character varying(25),
    start_date date,
    end_date date,
    created_at date DEFAULT CURRENT_DATE
);

CREATE TABLE customer
(
    id SERIAL PRIMARY KEY,
    first_name character varying(25),
    last_name character varying(25),
    date_of_birth date
);

CREATE TABLE provider
(
    id integer UNIQUE NOT NULL,
    prefix_code character varying(3) UNIQUE NOT NULL,
    description character varying(25) NOT NULL
);

CREATE TABLE insurance_type
(
    id integer UNIQUE NOT NULL,
    description character varying(20) NOT NULL
);

CREATE TABLE policy_status
(
    id integer UNIQUE NOT NULL,
    description character varying(20) NOT NULL
);

ALTER TABLE policy  
    ADD CONSTRAINT policy_customer_id_fkey FOREIGN KEY (customer_id)
    REFERENCES customer(id);

ALTER TABLE policy  
    ADD CONSTRAINT policy_provider_id_fkey FOREIGN KEY (provider_id)
    REFERENCES provider(id);

ALTER TABLE policy  
    ADD CONSTRAINT policy_insurance_type_id_fkey FOREIGN KEY (insurance_type_id)
    REFERENCES insurance_type(id);

ALTER TABLE policy  
    ADD CONSTRAINT policy_status_id_fkey FOREIGN KEY (status_id)
    REFERENCES policy_status(id);

END;

SELECT '*** Run insertBaseData.sql to add minimal test data ***', '*** Run generateBulkData.sql to add filler data ***' 
AS do_this_next;