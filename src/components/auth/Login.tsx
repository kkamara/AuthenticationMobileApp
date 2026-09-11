import { StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, Text } from "@/components/Themed";
import Button from '@/components/Button';
import ErrorComponent from '@/components/Error';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("")

  useEffect(() => {

  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
``      <Text style={styles.title}>Login Screen</Text>
      </View>
      <ErrorComponent error={error}/>
      <View style={styles.formGroup}>
        <Text style={styles.textLabel}>Email: {email}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.textLabel}>Password: {password}</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
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
});

export default Login