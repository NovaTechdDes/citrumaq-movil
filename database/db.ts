import * as SQLite from 'expo-sqlite';

export const db = async () => {
    const conexion = SQLite.openDatabaseAsync('citrumaq.db');
    return conexion;
}