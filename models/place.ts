class Place {
  id: number;
  title: string;
  imageUri: string;
  address: string;
  location: { lat: number, lng: number };
  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: { lat: number, lng: number },
    id: number,
  ) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
  }
}

export default Place;