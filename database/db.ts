import * as SQLite from 'expo-sqlite';

let databaseInstance: SQLite.SQLiteDatabase | null = null;

export const db = async () => {
  try {
    if (!databaseInstance) {
      databaseInstance = await SQLite.openDatabaseAsync('citrumaq.db');
    }
    console.log('✅ Conexión a Base de Datos establecida');
    return databaseInstance;
  } catch (error) {
    console.warn('⚠️ DB inválida, reintentando...', error);
    databaseInstance = null;

    databaseInstance = await SQLite.openDatabaseAsync('citrumaq.db');
    console.log('🔄 DB reabierta');

    return databaseInstance;
  }
};
