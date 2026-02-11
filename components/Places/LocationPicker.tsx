import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';

import Geolocation, {
  GeolocationError,
} from '@react-native-community/geolocation';
import { getAddress, getMapPreview } from '../../util/location';
import { useEffect, useState } from 'react';
import { NavigationList } from '../../constants/navigation';
import useAppNavigation from '../../hooks/useAppNavigation';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { AppNavigationParamList } from '../../types/navigation.models';

const LocationPicker = ({
  onPickLocation,
}: {
  onPickLocation: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
}) => {
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const isFocused = useIsFocused();

  const navigation = useAppNavigation();
  const route =
    useRoute<
      RouteProp<AppNavigationParamList, typeof NavigationList.AddPlace>
    >();

  useEffect(() => {
    if (isFocused && route.params) {
      setPickedLocation(route.params.pickedLocation);
    }
  }, [isFocused, route.params]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng,
        );
        onPickLocation({ ...pickedLocation, address });
      }
    };
    fetchAddress();
  }, [pickedLocation, onPickLocation]);

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
    navigation.navigate(NavigationList.Map);
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
