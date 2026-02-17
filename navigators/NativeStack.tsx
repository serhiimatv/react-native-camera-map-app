import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AllPlaces from '../screens/AllPlaces';
import AddPlace from '../screens/AddPlace';
import IconButton from '../components/UI/IconButton';
import { useCallback } from 'react';
import { Colors } from '../constants/colors';
import Map from '../screens/Map';
import { NavigationList } from '../constants/navigation';
import { AppNavigationParamList } from '../types/navigation.models';
import useAppNavigation from '../hooks/useAppNavigation';
import PlaceDetails from '../screens/PlaceDetails';

const Stack = createNativeStackNavigator<AppNavigationParamList>();

const NativeStack = () => {
  const navigation = useAppNavigation();
  const headerRight = useCallback<
    Exclude<NativeStackNavigationOptions['headerRight'], undefined>
  >(
    ({ tintColor }) => {
      const handlePress = () => {
        navigation.navigate(NavigationList.AddPlace);
      };
      return (
        <IconButton
          icon="add"
          size={24}
          color={tintColor ?? 'white'}
          onPress={handlePress}
        />
      );
    },
    [navigation],
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary500,
        },
        headerTintColor: Colors.gray700,
        contentStyle: {
          backgroundColor: Colors.gray700,
        },
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={{
          title: 'Your Favorite Places',
          headerTitleAlign: 'center',
          headerRight: headerRight,
        }}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlace}
        options={{
          title: 'Add a New Place',
          headerBackButtonDisplayMode: 'default',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: 'Map',
          headerBackButtonDisplayMode: 'default',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetails}
        options={{
          title: 'Loading place...',
          headerBackButtonDisplayMode: 'default',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default NativeStack;
