import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const Map = () => {
  const initialRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      provider={PROVIDER_GOOGLE}
    />
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
