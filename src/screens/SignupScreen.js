import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/app'; 

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Signup Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default SignupScreen;
