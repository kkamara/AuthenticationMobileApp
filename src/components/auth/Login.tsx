import { StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text } from "@/components/Themed";
import Button from '@/components/Button';
import ErrorComponent from '@/components/Error';
import {
  CommonActions,
  useNavigation,
  useFocusEffect,
} from 'expo-router/react-navigation';
import Loading from "@/components/Loading";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Code here runs when the screen is FOCUSED

      return () => {
        setEmail("");
        setPassword("");
        setError("");
        setLoading(false);
        setShowPassword(false);
      };
    }, [])
  );

  function toggleShowPassword() {
    setShowPassword(prev => !prev);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
``      <Text style={styles.title}>Login Screen</Text>
      </View>
      <ErrorComponent error={error}/>
      <View style={styles.formGroup}>
        <Text style={styles.textLabel}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType='email-address'
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.textLabel}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={showPassword === true}
        />
        <View style={styles.showPasswordView}>
          <Button
            pressableStyle={styles.showPasswordBtn}
            textStyle={styles.showPasswordText}
            text={"Show Password"}
            onPress={toggleShowPassword}
          />
        </View>
      </View>
      <Button
        pressableStyle={styles.button}
        text="Submit"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: "100%",
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
  textLabel: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  formGroup: {
    marginTop: 40,
  },
  button: {
    marginTop: 40,
    width: 310,
  },
  titleView: {
    width: 300,
  },
  showPasswordBtn: {
    width: 120,
    backgroundColor: "grey",
    borderColor: "#000",
    height: 40,
  },
  showPasswordText: {
    fontSize: 10,
    color: "#fff",
    marginVertical: -2.2,
  },
  showPasswordView: {
    flex: 1,
    maxHeight: 50,
    justifyContent: "flex-end",
    alignItems: 'flex-end',
  },
});

export default Login;
