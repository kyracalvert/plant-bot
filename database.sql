DATABASE NAME: plant_bot;

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE plant (
    id SERIAL PRIMARY KEY,
    owner_id integer NOT NULL,
    plant_name character varying NOT NULL,
    plant_photo character varying NOT NULL,
    light_exposure integer NOT NULL,
    care_instructions character varying,
    plant_type character varying
);


CREATE TABLE light_data (
    id SERIAL PRIMARY KEY,
    plant_id integer NOT NULL REFERENCES plant(id),
    date character varying NOT NULL,
    time time without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    light_amount integer
);

CREATE UNIQUE INDEX light_data_pk ON light_data(id int4_ops);



