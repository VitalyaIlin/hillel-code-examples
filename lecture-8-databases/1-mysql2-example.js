import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'sakila'
});

// A simple SELECT query
try {
  const [results, fields] = await connection.query(
    'SELECT * FROM `city` WHERE `country_id` > 40 LIMIT 5'
  );

  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
}
