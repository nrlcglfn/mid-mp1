import React, { useState } from 'react';
import { Button, TextInput, StyleSheet, View, Text, FlatList } from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [inputBackgroundColor, setInputBackgroundColor] = useState('#ff0000'); // Initial color is red

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, enteredGoalText]);
    setEnteredGoalText('');

    // Toggle between red, orange, yellow, and green background colors
    setInputBackgroundColor(prevColor => {
      if (prevColor === '#ff0000') {
        return '#ffa500'; // Orange
      } else if (prevColor === '#ffa500') {
        return '#ffff00'; // Yellow
      } else if (prevColor === '#ffff00') {
        return '#008000'; // Green
      } else {
        return '#ff0000'; // Red
      }
    });
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='My Goal'
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>

      <FlatList
        data={courseGoals}
        renderItem={({ item, index }) => (
          <View style={[styles.goalsContainer, { backgroundColor: index === 3 ? '#008000' : (index === 2 ? '#ffff00' : (index % 2 === 0 ? '#ff0000' : '#ffa500')) }]}>
            <Text style={styles.goalText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    borderWidth: 1,
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    paddingTop: 20,
    textAlign: 'left',
  },
  goalText: {
    margin: 10,
    fontFamily: 'Arial',
    fontSize: 20,
  },
});
