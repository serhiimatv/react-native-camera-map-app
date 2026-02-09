import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import useAppNavigation from '../hooks/useAppNavigation';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import IconButton from '../components/UI/IconButton';
import { NavigationList } from '../constants/navigation';

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const navigation = useAppNavigation();

  const initialRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (event: MapPressEvent) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  };

  const headerRight = useCallback<
    Exclude<NativeStackNavigationOptions['headerRight'], undefined>
  >(
    ({ tintColor }) => {
      const savePickedLocationHandler = () => {
        if (!selectedLocation) {
          Alert.alert(
            'No location picked',
            'You have to pick a location (by tapping the map) first!',
          );
          return;
        }
        navigation.navigate(NavigationList.AddPlace, {
          pickedLocation: {
            lat: selectedLocation.lat,
            lng: selectedLocation.lng,
          },
        });
      };
      return (
        <IconButton
          icon="save"
          size={24}
          color={tintColor ?? 'white'}
          onPress={savePickedLocationHandler}
        />
      );
    },
    [navigation, selectedLocation],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, [navigation, headerRight]);
  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      provider={PROVIDER_GOOGLE}
      mapPadding={{ top: 0, right: 0, bottom: 25, left: 0 }}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
