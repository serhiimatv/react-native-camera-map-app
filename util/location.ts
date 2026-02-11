import { MAP_API_KEY } from '../env';


export const getMapPreview = (lat: number, lng: number) => {
  const imagePositionPreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x300&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${MAP_API_KEY}`
  return imagePositionPreview;
}

export const getAddress = async (lat: number, lng: number) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }
  const data = await response.json();
  return data.results[0].formatted_address;
}