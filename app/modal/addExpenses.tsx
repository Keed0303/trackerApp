import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Drawer, Text, TextInput } from "react-native-paper";
const addExpenses = () => {
	const [text, setText] = useState<string>("");
	const _goBack = () => {
		router.replace("/(tabs)/home");
	};

	return (
    <>
			<Appbar.Header>
				<Appbar.BackAction onPress={_goBack} />
				<Appbar.Content title='Add Expenses' />
			</Appbar.Header>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            label='Amount'
            style={styles.input}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TextInput
            label='Purpose'
            style={styles.input}
            value={text}
            onChangeText={(text) => setText(text)}
          />
 
          <TextInput
            label='Note'
            style={styles.input}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TextInput
            label='Date'
            style={styles.input}
            value={text}
            onChangeText={(text) => setText(text)}
          />
      
          <Button mode="contained" style={styles.buttonSubmit}>
            <Text variant="bodyLarge" style={styles.ButtonText}>Submit</Text>
          </Button>
          
        </View>
      </View>
		</>
	);
};

const styles = StyleSheet.create({
  formContainer: {
    margin: 12
  },
  input: {
    backgroundColor: 'transparent',
    marginVertical: 5
  },
  container: {
    backgroundColor: '#ffffff',
    height: "100%"
  },
  buttonSubmit: {
    backgroundColor: '#002fff',
    marginTop: 10
  },
  ButtonText: {
    color: '#ffffff'
  }
});

export default addExpenses;
