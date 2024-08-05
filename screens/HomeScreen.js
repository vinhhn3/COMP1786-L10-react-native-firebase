// screens/HomeScreen.js
import { onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { database } from "../firebaseConfig";

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const booksRef = ref(database, "books/");
    onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      const bookList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
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
