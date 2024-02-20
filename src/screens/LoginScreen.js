import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import { TextInput } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // Ensuring both email and password are provided
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }

      // Sign in with Firebase authentication
      await firebase.auth().signInWithEmailAndPassword(email, password);

      // Navigate to the ChatScreen on successful login
      navigation.navigate("Chat");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat App</Text>
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
});

export default LoginScreen;
