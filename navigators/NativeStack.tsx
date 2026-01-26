import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AllPlaces from '../screens/AllPlaces';
import AddPlace from '../screens/AddPlace';
import IconButton from '../components/UI/IconButton';
import useAppNavigation from '../hooks/useAppNavigation';

const Stack = createNativeStackNavigator();

const NativeStack = () => {
  const navigation = useAppNavigation();
  const getHeaderRight: Exclude<
    NativeStackNavigationOptions['headerRight'],
    undefined
  > = ({ tintColor }) => {
    const handlePress = () => {
      navigation.navigate('AddPlace');
    };
    return (
      <IconButton
        icon="add"
        size={24}
        color={tintColor ?? 'white'}
        onPress={handlePress}
      />
    );
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={{
          headerRight: getHeaderRight,
        }}
      />
      <Stack.Screen name="AddPlace" component={AddPlace} />
    </Stack.Navigator>
  );
};

export default NativeStack;
