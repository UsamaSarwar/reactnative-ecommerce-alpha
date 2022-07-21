import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  Button,
  ImageBackground,
  Pressable,
  Image,
  Alert,
  FlatList,
} from "react-native";

import React, { useState } from "react";

import { useTasks } from "../providers/TasksProvider";

import { Task } from "../schemas";

import styles from "../styles/Styles";

export default function ProductItem() {
  const { tasks } = useTasks();
  console.log(tasks);
  return (
    // <FlatList/>
    <FlatList
      data={tasks}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
    // <View>
    //   {tasks.map((task) => (
    //     <Text key={task.id}>{task.name}</Text>
    //   ))}
    // </View>
  );
}
