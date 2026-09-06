import { Text, View, } from '@/components/Themed';
import { StyleSheet, } from 'react-native';

export default function AuthButtonsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Buttons Screen</Text>
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
});
