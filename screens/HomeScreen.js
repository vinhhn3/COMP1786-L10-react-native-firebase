// screens/HomeScreen.js
import { onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { database } from "../firebaseConfig";

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Create a reference to the "books/" node in the Firebase Realtime Database
    const booksRef = ref(database, "books/");

    // Set up a listener on the booksRef reference
    onValue(booksRef, (snapshot) => {
      // Retrieve the data from the snapshot
      const data = snapshot.val();

      // Convert the data object into an array of book objects
      // Each book object includes an id property (the key) and the rest of the book details
      const bookList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];

      // Update the state with the new list of books
      setBooks(bookList);
    });
  }, []);

  const deleteBook = (id) => {
    remove(ref(database, `books/${id}`));
  };

  return (
    <View>
      <Button title="Add Book" onPress={() => navigation.navigate("AddBook")} />
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => deleteBook(item.id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
