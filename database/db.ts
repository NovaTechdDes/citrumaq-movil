import * as SQLite from 'expo-sqlite';

let database: SQLite.SQLiteDatabase | null = null;

export const getDb = async () => {
  if (database) return database;
  database = await SQLite.openDatabaseAsync('citrumaq.db', {
    useNewConnection: true,
  });
  console.log(database);
  return database;
};
