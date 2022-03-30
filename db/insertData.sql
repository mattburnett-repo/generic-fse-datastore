
-- RUN CREATE SCRIPT USING FOLOWING LINE
-- psql postgres -d feather_fullstack_code_challenge -f ./db/createDatabase.sql

-- RUN THIS TO ADD MINIMAL TEST DATA (this file)
-- psql postgres -d feather_fullstack_code_challenge -f ./db/insertData.sql

-- POLICY STATUS 
INSERT INTO policy_status(id, description) VALUES (1, 'Active');
INSERT INTO policy_status(id, description) VALUES (2, 'Pending');
INSERT INTO policy_status(id, description) VALUES (3, 'Cancelled');
INSERT INTO policy_status(id, description) VALUES (4, 'Dropped out');

-- INSURANCE TYPE
INSERT INTO insurance_type(id, description) VALUES (1, 'Liability');
INSERT INTO insurance_type(id, description) VALUES (2, 'Household');
INSERT INTO insurance_type(id, description) VALUES (3, 'Health');

-- PROVIDER
INSERT INTO provider(id, prefix_code, description) VALUES (1, 'ALL', 'Allianz');
INSERT INTO provider(id, prefix_code,  description) VALUES (2, 'AXA', 'AXA');
INSERT INTO provider(id, prefix_code,  description) VALUES (3, 'ERG', 'ERGO Insurance Group');
INSERT INTO provider(id, prefix_code,  description) VALUES (4, 'DKV', 'DKV');

-- CUSTOMER
INSERT INTO customer(first_name, last_name, date_of_birth) VALUES('firstName 01', 'lastName 01', to_timestamp('1970-01-01', 'YYYY-MM-DD'));
INSERT INTO customer(first_name, last_name, date_of_birth) VALUES('firstName 02', 'lastName 02', to_timestamp('1980-02-02', 'YYYY-MM-DD'));
INSERT INTO customer(first_name, last_name, date_of_birth) VALUES('firstName 03', 'lastName 03', to_timestamp('1990-03-03', 'YYYY-MM-DD'));

-- POLICY
INSERT INTO policy(customer_id, provider_id, insurance_type_id, status_id, policy_number, start_date, end_date)
VALUES (1, 1, 1, 1, 'ALLaaa111', to_timestamp('2000-01-01', 'YYYY-MM-DD'), to_timestamp('2001-01-01', 'YYYY-MM-DD'));
INSERT INTO policy(customer_id, provider_id, insurance_type_id, status_id, policy_number, start_date, end_date)
VALUES (2, 2, 2, 2, 'AXAbbb222', to_timestamp('2000-02-02', 'YYYY-MM-DD'), to_timestamp('2002-02-02', 'YYYY-MM-DD'));
INSERT INTO policy(customer_id, provider_id, insurance_type_id, status_id, policy_number, start_date, end_date)
VALUES (3, 3, 3, 3, 'ERGccc333', to_timestamp('2000-03-03', 'YYYY-MM-DD'), to_timestamp('2003-03-03', 'YYYY-MM-DD'));
INSERT INTO policy(customer_id, provider_id, insurance_type_id, status_id, policy_number, start_date, end_date)
VALUES (3, 2, 2, 4, 'ALLddd444', to_timestamp('2000-04-04', 'YYYY-MM-DD'), to_timestamp('2004-04-04', 'YYYY-MM-DD'));

