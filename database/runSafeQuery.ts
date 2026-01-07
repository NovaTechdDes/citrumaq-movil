import * as SQLite from 'expo-sqlite';
import { db } from './db';

export const runSafeQuery = async <T>(fn: (db: SQLite.SQLiteDatabase) => Promise<T>): Promise<T> => {
  try {
    const database = await db();
    return await fn(database);
  } catch (error) {
    console.warn('⚠️ Query falló, reintentando...', error);
    const database = await db();
    return await fn(database);
  }
};
