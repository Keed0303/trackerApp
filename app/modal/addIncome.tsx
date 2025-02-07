import { router, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Drawer, Text, TextInput } from "react-native-paper";
import firestore, { firebase } from '@react-native-firebase/firestore';

interface Transaction {
  id: string;
  amount: string;
  purpose: string;
  date: string;
  createdAt: any; // or use proper Firebase Timestamp type if needed
}

// Get user document with an ID of ABC
const addIncome = () => {
	const [amount, setAmount] = useState("");
	const [purpose, setPurpose] = useState("");
	const [date, setDate] = useState("");
	const [transaction, setTransaction] = useState<Transaction[]>([]);

	const _goBack = () => {
		router.replace("/(tabs)");
  };
  
	const addIncome = async () => {
			try {
				await firestore().collection('income').doc('customId').set({
					id: 1,
					amount: amount, 
					purpose: purpose, 
					date: date
				});
				alert('success');
			} catch (error) {
				alert('error');
				console.error('Error adding user: ', error);
			}
	}

	// useEffect(() => {
	// 	const listenForUsers = () => {
	// 		const subscriber = firestore()
	// 			.collection('income')
	// 			.onSnapshot((querySnapshot) => {
	// 				querySnapshot.forEach((doc) => {
	// 					console.log('User ID: ', doc.id, 'Data: ', doc.data());
	// 				});
	// 			});
		
	// 		// Unsubscribe from updates when no longer needed
	// 		return () => subscriber();
	// 	};
		
	// 	// Call this function in a useEffect hook or similar
	// 	listenForUsers();
	// }, []);

	return (
		<>
			<Appbar.Header>
				<Appbar.BackAction onPress={_goBack} />
				<Appbar.Content title='Add Income' />
			</Appbar.Header>
			<View style={styles.container}>
				<View style={styles.formContainer}>
					<TextInput
						label='Amount'
						style={styles.input}
						value={amount}
						onChangeText={(text) => setAmount(text)}
					/>
					<TextInput
						label='Purpose'
						style={styles.input}
						value={purpose}
						onChangeText={(text) => setPurpose(text)}
					/>
					<TextInput
						label='Date'
						style={styles.input}
						value={date}
						onChangeText={(text) => setDate(text)}
					/>

					<Button mode='contained' style={styles.buttonSubmit} onPress={addIncome}>
						<Text variant='bodyLarge' style={styles.ButtonText}>
							Submit
						</Text>
					</Button>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		margin: 12,
	},
	input: {
		backgroundColor: "transparent",
		marginVertical: 5,
	},
	container: {
		backgroundColor: "#ffffff",
		height: "100%",
	},
	buttonSubmit: {
		backgroundColor: "#002fff",
		marginTop: 10,
	},
	ButtonText: {
		color: "#ffffff",
	},
});

export default addIncome;
