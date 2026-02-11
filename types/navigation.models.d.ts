import Place from "../models/place";

export type AppNavigationParamList = {
  AllPlaces: { place: Place } | undefined;
  AddPlace: { pickedLocation: { lat: number, lng: number } } | undefined;
  Map: undefined
};