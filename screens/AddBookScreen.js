// screens/AddBookScreen.js
import { push, ref } from "firebase/database";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { database } from "../firebaseConfig";

export default function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState("");

  const addBook = () => {
    if (title.trim() === "") {
      alert("Book title cannot be empty!");
      return;
    }
    const booksRef = ref(database, "books/");
    push(booksRef, { title })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        alert(error.message);
      });
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
