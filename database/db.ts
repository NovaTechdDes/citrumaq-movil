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
    console.error('❌ Error al conectar a la base de datos:', error);
    throw error;
  }
};
