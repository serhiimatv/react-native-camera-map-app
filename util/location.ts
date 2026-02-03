import { MAP_API_KEY } from '../env';


export const getMapPreview = (lat: number, lng: number) => {
  const imagePositionPreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x300&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${MAP_API_KEY}`
  return imagePositionPreview;
}