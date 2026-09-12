import { StyleSheet, } from 'react-native';
import React from 'react';
import { View } from '@/components/Themed';
import { useAccounts } from '@/providers/AccountsProvider';
import { CommonActions, useNavigation, } from 'expo-router/react-navigation';
import { isCustomErrorResponse } from '@/typeHandlers';
import Button from '@/components/Button';

const AccountScreen = () => {
  const { logout } = useAccounts();
  
  const navigation = useNavigation();

  async function onLogoutButtonPress() {
    const res = await logout();
    if (true === isCustomErrorResponse(res)) {
      // alert(res.error);
    }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: '(auth)',
            state: {
              index: 0,
              routes: [{ name: 'authButtons' }],
            },
          },
        ],
      })
    );
  }

  return (
    <View style={styles.container}>
      <Button
        pressableStyle={styles.button}
        textStyle={styles.buttonText}
        onPress={onLogoutButtonPress}
        text="Logout"
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 20,
    width: 400,
  },
  buttonText: {
    fontSize: 28,
  },
});

export default AccountScreen;
