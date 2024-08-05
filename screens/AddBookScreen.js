// screens/AddBookScreen.js
import { push, ref } from "firebase/database";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { database } from "../firebaseConfig";

export default function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState("");

  const addBook = async () => {
    // Check if the title is empty after trimming whitespace
    if (title.trim() === "") {
      // Alert the user that the book title cannot be empty
      alert("Book title cannot be empty!");
      return; // Exit the function early
    }

    // Create a reference to the "books/" node in the Firebase Realtime Database
    const booksRef = ref(database, "books/");

    try {
      // Push a new book with the title to the "books/" node
      await push(booksRef, { title });
      // Navigate back to the previous screen upon successful addition
      navigation.goBack();
    } catch (error) {
      // Alert the user if there is an error during the push operation
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Book Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Add Book" onPress={addBook} />
    </View>
  );
}
