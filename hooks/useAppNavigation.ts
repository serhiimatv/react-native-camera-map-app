import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppNavigationParamList } from "../types/navigation.models";

type AppNavigationProp = NativeStackNavigationProp<AppNavigationParamList>;

const useAppNavigation = () => {
  const navigation = useNavigation<AppNavigationProp>();
  return navigation;
};

export default useAppNavigation;