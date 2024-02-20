import React, { useState, useEffect } from "react";
import { View, FlatList, TextInput, Button, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import ChatBubble from "../components/ChatBubble";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
      });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (newMessage.trim() === "") {
      return;
    }

    await firebase.firestore().collection("messages").add({
      text: newMessage,
      createdAt: new Date(),
      userId: currentUser.uid,
    });

    setNewMessage("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatBubble
            message={item.text}
            isCurrentUser={item.userId === currentUser.uid}
          />
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          onChangeText={(text) => setNewMessage(text)}
          value={newMessage}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
  },
});

export default ChatScreen;
