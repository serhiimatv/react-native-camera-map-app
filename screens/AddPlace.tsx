import { StackActions } from '@react-navigation/native';
import PlaceForm from '../components/Places/PlaceForm';
import { NavigationList } from '../constants/navigation';
import useAppNavigation from '../hooks/useAppNavigation';
import Place from '../models/place';

const AddPlace = () => {
  const navigation = useAppNavigation();

  const createPlaceHandler = (place: Place) => {
    navigation.dispatch(
      StackActions.popTo(NavigationList.AllPlaces, {
        place,
      }),
    );
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
