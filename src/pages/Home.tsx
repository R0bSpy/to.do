import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface IEditTask {
  taskId: number;
  newTaskTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskSameName = tasks.find(task => task.title === newTaskTitle)

    if(taskSameName) {
      Alert.alert("Task já cadastrada",
      "Você não pode cadastrar uma task com o mesmo nome")
      return
    }

    const data: Task = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle
    }

    setTasks(oldState => [...oldState, data])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => 
      oldState.map(task => {
        if(task.id === id) {
          task.done = !task.done
        }
        return task
      }))
  }

  function handleEditTask({ taskId, newTaskTitle }: IEditTask) {
    setTasks(oldState => oldState.map(task => {
      if(task.id === taskId) {
        task.title = newTaskTitle
      }
      return task
    }))
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => setTasks(oldState => 
            oldState.filter(task => task.id !== id)),
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );

    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})