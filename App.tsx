import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  View,
} from "react-native";

//define todo list type
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  //define state for todolist
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // add to list function
  const addTodo = () => {
    if (input.trim()) {
      setTodos((prev) => [
        ...prev,
        { id: Date.now().toString(), text: input, completed: false },
      ]);
      setInput("");
    }
  };

  //toggle completed function
  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        id === todo.id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  //delete todo function
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => id !== todo.id));
  };

  // create a component to render the items

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)}>
        <Text style={[styles.text, item.completed && styles.completedText]}>{item.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List App</Text>
      <View style={styles.inputView}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} />
        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputView: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#383838",
    borderRadius: 4,
    padding: 8,
  },
  addBtn: {
    marginLeft: 10,
    backgroundColor: "#00dcfe",
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  text: { fontSize: 18},
  delete: { color: '#ff0000'},
  completedText: {
    textDecorationLine: 'line-through'
  }
});
