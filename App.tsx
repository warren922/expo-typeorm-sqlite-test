import { useEffect } from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import dataSource from "./ds";
import { Todo } from "./entitiy";

export default function App() {

  const [todos, setTotods] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dataSource.initialize()
      .finally(() => {
        setLoading(false)
      })

  }, []);

  useEffect(() => {
    if (!loading) {
      const loadTotods = async () => {
        const repo = dataSource.getRepository(Todo)
        const allTodos = await repo.find()
        console.log("All Todos", allTodos)
        setTotods(allTodos)
      }
      loadTotods();
    }
  }, [loading])

  const handleCreate = async () => {
    // create 
    const repo = dataSource.getRepository(Todo)
    const newTodo = new Todo()
    newTodo.content = text
    console.log("newTodo: ", newTodo)
    const results = await repo.save(newTodo)
    console.log("results", results)
    setText("")
  }

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <>
        {todos.map((todo) => (
          <View>
            <Text style={{ color: "black" }}>{todo.content}</Text>
          </View>
        ))}

        <TextInput value={text} onChangeText={setText}></TextInput>
        <Button onPress={handleCreate} title={"Create"} />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
