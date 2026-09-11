import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Button from '@/components/Button';
import { useAccounts } from '@/providers/AccountsProvider';

export default function TabOneScreen() {
  const { logout } = useAccounts();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        text="Logout"
        onPress={async () => {
          const res = await logout();
          console.log("logout res", res);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
