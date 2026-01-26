import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import glyphMap from '@react-native-vector-icons/ionicons/glyphmaps/Ionicons.json';

const IconButton = ({
  icon,
  color,
  size,
  onPress,
}: {
  icon: keyof typeof glyphMap;
  color: string;
  size: number;
  onPress: () => void;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {},
  pressed: {
    opacity: 0.7,
  },
});
