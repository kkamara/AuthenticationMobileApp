import Button from '@/components/Button';
import { View, } from '@/components/Themed';
import { StyleSheet, } from 'react-native';
import { useRouter, } from 'expo-router';

export default function AuthButtonsScreen() {
  const router = useRouter();

  function goToLoginScreen() {
    router.push('/login');
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={goToLoginScreen}
        pressableStyle={styles.button}
        textStyle={styles.buttonText}
        text="Login"
      />
      <Button
        pressableStyle={styles.button}
        textStyle={styles.buttonText}
        text="Register"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 74,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 20,
    width: 400,
  },
  buttonText: {
    fontSize: 28,
  },
});
