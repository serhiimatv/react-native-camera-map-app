import { open } from "react-native-nitro-sqlite";

const database = open({ name: 'places.db' });

export const initDatabase = async () => {
  return new Promise((resolve, reject) => {
    database.transaction(async (tx) => {
      tx.executeAsync(`CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`).then(() => {
        resolve(true);
      }).catch((error) => {
        console.error(error);
        reject(error);
      });
    })
  })
}