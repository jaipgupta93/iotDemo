var pg = require('pg')
    , connectionString = process.env.DATABASE_URL
    , client
    , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('CREATE TABLE series (id serial primary key, uid CHARACTER VARYING(255), sensor_id CHARACTER VARYING(255), value real, created_at timestamp without time zone )');
query = client.query('CREATE TABLE locations (id serial primary key,  latitude double precision,  longitude double precision,  sensor_id character varying(255),  uid character varying(255))');

query.on('end', function () {
    client.end();
});
