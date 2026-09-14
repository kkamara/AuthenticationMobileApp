import { StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, Text } from "@/components/Themed";
import ErrorComponent from '@/components/Error';
import Loading from "@/components/Loading";
import { useAccounts } from "@/providers/AccountsProvider";
import Button from "@/components/Button";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register, loading: accountsLoading } = useAccounts();
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
  }, []);

  function toggleShowPassword() {
    setShowPassword(prev => !prev);
  }

  async function onSubmit() {
  }

  if (loading || accountsLoading) {
    return <View style={styles.container}>
      <Loading />
    </View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Register Screen</Text>
      </View>
      <ErrorComponent style={styles.errorView} error={error}/>
      <View style={styles.formGroup}>
        <Text style={styles.textLabel}>First Name:*</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.textLabel}>Last Name:*</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.textLabel}>Email:*</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType='email-address'
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.textLabel}>Password:*</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={showPassword === false}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.textLabel}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          placeholder="Enter your password confirmation"
          secureTextEntry={showPassword === false}
        />
        <View style={styles.showPasswordView}>
          <Button
            pressableStyle={styles.showPasswordBtn}
            textStyle={styles.showPasswordBtnText}
            text={showPassword ? "Hide Password" : "Show Password"}
            onPress={toggleShowPassword}
          />
        </View>
      </View>
      <Button
        pressableStyle={styles.button}
        text="Submit"
        onPress={onSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  titleView: {
    width: 300,
  },
  formGroup: {
    marginTop: 25,
  },
  errorView: {
    marginTop: 15,
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
  showPasswordView: {
    flex: 1,
    maxHeight: 50,
    justifyContent: "flex-end",
    alignItems: 'flex-end',
  },
  showPasswordBtn: {
    width: 120,
    backgroundColor: "grey",
    borderColor: "#000",
    height: 40,
  },
  showPasswordBtnText: {
    fontSize: 10,
    color: "#fff",
    marginVertical: -2.2,
  },
  button: {
    marginTop: 40,
    width: 310,
  },
});

export default Register;
