import { StackActions } from '@react-navigation/native';
import PlaceForm from '../components/Places/PlaceForm';
import { NavigationList } from '../constants/navigation';
import useAppNavigation from '../hooks/useAppNavigation';
import { insertPlace } from '../util/database';
import { InsertDatabasePlaceType } from '../types/database-type.models';

const AddPlace = () => {
  const navigation = useAppNavigation();

  const createPlaceHandler = async (place: InsertDatabasePlaceType) => {
    await insertPlace(place);
    navigation.dispatch(StackActions.popTo(NavigationList.AllPlaces));
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
