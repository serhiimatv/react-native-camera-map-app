import { useState } from 'react';
import { View, Text, StyleSheet, Platform, Alert, Image } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

const ImagePicker = ({
  onTakeImage,
}: {
  onTakeImage: (imageUri: string) => void;
}) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const checkCameraPermission = async () => {
    if (Platform.OS === 'ios') {
      const iosResult = await check(PERMISSIONS.IOS.CAMERA);
      if (iosResult === RESULTS.GRANTED) {
        return true;
      } else {
        const iosResultRequest = await request(PERMISSIONS.IOS.CAMERA);
        if (iosResultRequest === RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      const androidResult = await check(PERMISSIONS.ANDROID.CAMERA);
      if (androidResult === RESULTS.GRANTED) {
        return true;
      } else {
        const androidResultRequest = await request(PERMISSIONS.ANDROID.CAMERA);
        if (androidResultRequest === RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  const verifyPermissions = async () => {
    const hasPermission = await checkCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'You need to grant permission to use the camera',
      );
      return false;
    }
    return true;
  };
  const pickImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
      maxWidth: 400,
      maxHeight: 400,
    });
    if (image.assets?.[0]?.uri) {
      setPickedImage(image.assets[0].uri);
      onTakeImage(image.assets[0].uri);
    }
  };

  let imagePreview = <Text>No image picked yet.</Text>;
  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={pickImageHandler}>
        Pick Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 300,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});
