import React, { useEffect, useRef, useState } from "react"
import { View, TouchableOpacity, Image, StyleSheet, TextInput } from "react-native"
import { Task } from "./TasksList"
import { IEditTask } from "../pages/Home"
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import Icon from "react-native-vector-icons/Feather"

interface ITaskItemProps {
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (data: IEditTask) => void;
  item: Task;
}

export function TaskItem({index,item,removeTask,toggleTaskDone,editTask}: ITaskItemProps) {

  const [onEdit, setOnEdit] = useState(false)
  const [oldTaskTitle, setOldTaskTitle] = useState(item.title)
  const [newTaskTitle, setNewTaskTitle] = useState(item.title)

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setOnEdit(true)
  }

  function handleCancelEditing() {
    setOnEdit(false)
    setNewTaskTitle(oldTaskTitle)
  }

  function handleSubmitEditing(taskId: number) {
    editTask({
      newTaskTitle,
      taskId
    })
    setOldTaskTitle(newTaskTitle)
    setOnEdit(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (onEdit) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [onEdit])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
          disabled={onEdit}
        >
          <View 
            testID={`marker-${index}`}
            style={[item.done ? styles.taskMarkerDone : styles.taskMarker, { opacity: onEdit ? 0.5 : 1 }]}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
                style={{ opacity: onEdit ? 0.5 : 1 }}
              />
            )}
          </View>

          <TextInput 
            style={item.done ? styles.taskTextDone : styles.taskText}
            editable={onEdit}
            ref={textInputRef}
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            onSubmitEditing={() => handleSubmitEditing(item.id)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsArea}>
        {!onEdit ? <TouchableOpacity
          testID={`edit-${index}`}
          style={{ paddingHorizontal: 12, opacity: item.done ? 0.5 : 1 }}
          onPress={handleStartEditing}
          disabled={item.done}
        >
          <Image source={editIcon} />
        </TouchableOpacity> : <TouchableOpacity
          testID={`edit-${index}`}
          style={{ paddingHorizontal: 12 }}
          onPress={handleCancelEditing}
        >
          <Icon name="x" size={24} color="#b2b2b2" />
        </TouchableOpacity>}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24, opacity: onEdit ? 0.5 : 1 }}
          disabled={onEdit}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    padding: 0
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
    padding: 0
  },
  iconsArea: {
    flexDirection: 'row'
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  }
})