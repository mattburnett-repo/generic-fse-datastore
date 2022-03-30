
-- create postgresql database as data store

-- psql postgres -d feather_fullstack_code_challenge -f ./db/createDatabase.sql

-- *** Create database in Postbird / some other Postgres tool of choice. ***
--      trying to run -> psql postgres -d feather_fullstack_code_challenge -f -a ./db/createDatabase.sql
--          results in error -> psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: FATAL:  database "feather_fullstack_code_challenge" does not exist
--      trying to fix this with various permutations of command line args just results in more errors that just don't make sense

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

SELECT '*** Run insertTestData.sql to add minimal test data ***' AS do_this_next;