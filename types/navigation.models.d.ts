export type AppNavigationParamList = {
  AllPlaces: undefined;
  AddPlace: { pickedLocation: { lat: number, lng: number } } | undefined;
  Map: { initialLocation: { lat: number, lng: number } } | undefined;
  PlaceDetails: { placeId: number }
};