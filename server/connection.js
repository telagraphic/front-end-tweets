require('dotenv').config();
// Proper way to initialize and share the Database object

// Loading and initializing the library:
const postgres = require('pg-promise')({
    // Initialization Options
});

// Preparing the connection details:
// const connection = 'postgres://username:password@host:port/database';

const local = {
  host: 'localhost',
  port: 5432,
  database: 'front-end-tweets-test',
  user: 'telagraphic',
  password: 'P@ssw0rd'
};

const connection = process.env.DATABASE_URL || local;

// Creating a new database instance from the connection details:
const database = postgres(connection);

// Exporting the database object for shared use:
module.exports = database;
