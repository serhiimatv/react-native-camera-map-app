import { useEffect, useState } from 'react';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';

import PlacesList from '../components/Places/PlacesList';
import { AppNavigationParamList } from '../types/navigation.models';
import { NavigationList } from '../constants/navigation';
import Place from '../models/place';

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const route =
    useRoute<
      RouteProp<AppNavigationParamList, typeof NavigationList.AllPlaces>
    >();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const place = route.params.place;
      if (place) {
        setLoadedPlaces(currentPlaces => [...currentPlaces, place]);
      }
    }
  }, [isFocused, route.params]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
