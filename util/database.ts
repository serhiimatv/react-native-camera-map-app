import { open } from "react-native-nitro-sqlite";
import Place from "../models/place";

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

export const insertPlace = async (place: Place) => {
  return new Promise((resolve, reject) => {
    database.transaction(async (tx) => {
      return tx.executeAsync(`INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [place.title, place.imageUri, place.address, place.location.lat, place.location.lng]
      )
    }).then((result) => {
      resolve(result);
    }).catch((error) => {
      console.error(error);
      reject(error);
    })
  })
}

export const fetchPlaces = async (): Promise<Place[]> => {
  return new Promise((resolve, reject) => {
    database.transaction(async (tx) => {
      return tx.executeAsync(`SELECT * FROM places`)
    }).then((result) => {
      const places: Place[] = [];
      for (const row of result.rows?._array ?? [] as Place[]) {
        const place = row as Place;
        places.push(new Place(place.title, place.imageUri, place.address, place.location, place.id));
      }

      resolve(places);
    }).catch((error) => {
      console.error(error);
      reject(error);
    })
  })
}