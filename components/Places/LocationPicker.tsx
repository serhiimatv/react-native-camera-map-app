import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';

import Geolocation, {
  GeolocationError,
} from '@react-native-community/geolocation';
import { getMapPreview } from '../../util/location';
import { useState } from 'react';
import useAppNavigation from '../../hooks/useAppNavigation';

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const navigation = useAppNavigation();

  const getLocationHandler = async () => {
    Geolocation.getCurrentPosition(
      position => {
        setPickedLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error: GeolocationError) => {
        console.log('error', error);
        Alert.alert('Could not get location!', `${error.message}`);
      },
    );
  };
  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  let locationPreview = <Text>No location picked yet.</Text>;
  if (pickedLocation?.lat && pickedLocation?.lng) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});
