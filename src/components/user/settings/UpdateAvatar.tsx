import { Text, View } from "@/components/Themed";
import { useState, useEffect, } from 'react';
import { Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Button from "@/components/Button";
import { useAccounts } from "@/providers/AccountsProvider";

interface Props {
  style?: object;
  user: UserResponse | null;
}

const UpdateAvatar = ({ style, user }: Props) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const {} = useAccounts();

  useEffect(() => {
    setImageUri(user?.avatarPath || null);
  }, [user]);

  async function handleRemove() {
    console.log("in handle remove");
    return;
  }

  async function handleSelect() {
    console.log("in handle select");
    return;
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (!result.didCancel && result.assets?.[0]?.uri) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };
  
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: imageUri || undefined }}
        style={styles.image}
      />
      <View style={styles.buttonsView}>
        <Button
          pressableStyle={styles.uploadAvatarButton}
          textStyle={styles.uploadAvatarButtonText}
          onPress={handleSelect}
          text="Upload"
        />
        <Button
          onPress={handleRemove}
          pressableStyle={styles.removeAvatarButton}
          textStyle={styles.removeAvatarButtonText}
          text="Remove Photo"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonsView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 45,
  },
  removeAvatarButton: {
    backgroundColor: 'red',
    width: 130,
  },
  removeAvatarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: -10,
  },
  uploadAvatarButton: {
    width: 130,
    marginBottom: 5,
    borderWidth: 0,
  },
  uploadAvatarButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: -10,
    textAlign: 'center',
  },
});

export default UpdateAvatar;
