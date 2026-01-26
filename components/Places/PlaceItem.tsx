import { Text, View, Image, Pressable, StyleSheet } from 'react-native';

import Place from '../../models/place';

const PlaceItem = ({
  place,
  onSelect,
}: {
  place: Place;
  onSelect: () => void;
}) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
