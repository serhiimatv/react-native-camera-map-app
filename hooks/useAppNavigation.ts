import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AppNavigationParamList = {
  AllPlaces: undefined;
  AddPlace: { pickedLocation: { lat: number, lng: number } } | undefined;
  Map: undefined
};

type AppNavigationProp = NativeStackNavigationProp<AppNavigationParamList>;

const useAppNavigation = () => {
  const navigation = useNavigation<AppNavigationProp>();
  return navigation;
};

export default useAppNavigation;