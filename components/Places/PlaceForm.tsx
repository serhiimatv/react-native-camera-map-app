import { useCallback, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import Place from '../../models/place';

const PlaceForm = ({
  onCreatePlace,
}: {
  onCreatePlace: (place: Place) => void;
}) => {
  const [enteredTitle, setEnteredTitle] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  const changeTitleHandler = (text: string) => {
    setEnteredTitle(text);
  };

  const takeImageHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback(
    (location: { lat: number; lng: number; address: string }) => {
      setPickedLocation(location);
    },
    [],
  );

  const savePlaceHandler = () => {
    const place = new Place(
      enteredTitle,
      selectedImage ?? '',
      pickedLocation?.address ?? '',
      pickedLocation
        ? { lat: pickedLocation.lat, lng: pickedLocation.lng }
        : { lat: 0, lng: 0 },
    );
    onCreatePlace(place);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={enteredTitle}
          onChangeText={changeTitleHandler}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler} style={styles.button}>
        Add Place
      </Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderRadius: 6,
    backgroundColor: Colors.primary100,
  },
  button: {
    marginTop: 8,
  },
});
