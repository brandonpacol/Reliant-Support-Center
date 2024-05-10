import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./main.db', (err: Error | null) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Database connected!');
  }
});

export default db;