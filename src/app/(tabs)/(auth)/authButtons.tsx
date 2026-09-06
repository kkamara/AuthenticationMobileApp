import Button from '@/components/Button';
import { View, } from '@/components/Themed';
import { StyleSheet, } from 'react-native';

export default function AuthButtonsScreen() {
  return (
    <View style={styles.container}>
      <Button
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
    marginTop: 74,
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
