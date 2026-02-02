import Ionicons from '@react-native-vector-icons/ionicons';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import glyphMap from '@react-native-vector-icons/ionicons/glyphmaps/Ionicons.json';
import { Colors } from '../../constants/colors';

const OutlinedButton = ({
  children,
  onPress,
  icon,
  style,
}: {
  children: string;
  onPress: () => void;
  icon: keyof typeof glyphMap;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        color={Colors.primary500}
        size={18}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary500,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
