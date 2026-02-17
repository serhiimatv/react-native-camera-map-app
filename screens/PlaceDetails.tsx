import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import { Colors } from '../constants/colors';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppNavigationParamList } from '../types/navigation.models';
import { NavigationList } from '../constants/navigation';
import { useEffect, useState } from 'react';
import { fetchPlaceDetails } from '../util/database';
import Place from '../models/place';
import useAppNavigation from '../hooks/useAppNavigation';

const PlaceDetails = () => {
  const [loadedPlace, setLoadedPlace] = useState<Place | null>(null);

  const navigation = useAppNavigation();
  const route =
    useRoute<
      RouteProp<AppNavigationParamList, typeof NavigationList.PlaceDetails>
    >();

  const showOnMapHandler = () => {
    console.log('showOnMapHandler');
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    const loadPlaceData = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setLoadedPlace(place);

      if (place) {
        navigation.setOptions({
          title: place.title,
        });
      }
    };
    loadPlaceData();
  }, []);

  if (!loadedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={
          loadedPlace?.imageUri
            ? { uri: loadedPlace.imageUri }
            : require('../assets/logo.png')
        }
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{loadedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
