DATABASE NAME: plant_bot;

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE "plant" (
	"id" serial NOT NULL,
	"owner_id" integer NOT NULL,
	"plant_name" varchar NOT NULL,
	"plant_photo" varchar NOT NULL,
	"light_exposure" integer NOT NULL,
	"care_instructions" varchar NOT NULL,
	CONSTRAINT plant_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE light_data (
    id SERIAL PRIMARY KEY,
    plant_id integer NOT NULL REFERENCES plant(id),
    date character varying NOT NULL,
    time time without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    light_amount integer
);

CREATE UNIQUE INDEX light_data_pk ON light_data(id int4_ops);



