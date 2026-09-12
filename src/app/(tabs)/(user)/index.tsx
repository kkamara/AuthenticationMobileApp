import { StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import { View } from '@/components/Themed';
import { useAccounts } from '@/providers/AccountsProvider';
import { CommonActions, useNavigation, } from 'expo-router/react-navigation';
import { isCustomErrorResponse } from '@/typeHandlers';
import Button from '@/components/Button';
import Loading from "@/components/Loading";

const AccountScreen = () => {
  const { logout } = useAccounts();
  
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  async function onLogoutButtonPress() {
    setLoading(true);
    const res = await logout();
    if (true === isCustomErrorResponse(res)) {
      // alert(res.error);
    }
    setLoading(false);
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

  if (loading) {
    return <View style={styles.container}>
      <Loading />
    </View>
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
