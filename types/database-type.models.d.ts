import Place from "../models/place";

export interface PlaceDatabaseType {
  id: number;
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;
}

export type InsertDatabasePlaceType = Omit<Place, 'id'>;