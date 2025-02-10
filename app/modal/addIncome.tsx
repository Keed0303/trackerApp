import { router, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
	ActivityIndicator,
	Appbar,
	Button,
	Text,
	TextInput,
} from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

interface Transaction {
	amount: string;
	purpose: string;
	date: Date;
	createdAt: any; // or use proper Firebase Timestamp type if needed
}

// Get user document with an ID of ABC
const addIncome = () => {
	const [amount, setAmount] = useState("");
	const [purpose, setPurpose] = useState("");
	const [loading, setLoading] = useState(false);
	const date = new Date();


	const _goBack = () => {
		router.replace("/(tabs)");
	};



	const add = () => {
		setLoading(true);
		firestore()
			.collection("income")
			.add({
				amount: amount,
				purpose: purpose,
				date: new Date(),
			})
			.then((response) => {
				if (response) {
					setLoading(false);
					Alert.alert('Success', 'Trasaction has successfuly save');
					router.replace("/(tabs)");
				}
			})
			.catch((error) => {
				setLoading(false);
				Alert.alert('Failed', 'Please try again!');
				router.replace("/(tabs)");
			});
	};

	const getCurrentDate=()=>{
 
			var date = new Date().getDate();
			var month = new Date().getMonth() + 1;
			var year = new Date().getFullYear();

			//Alert.alert(date + '-' + month + '-' + year);
			// You can turn it in to your desired format
			return date + '-' + month + '-' + year;//format: d-m-y;
	}
	useEffect(() => {
		console.log('date', date);
		
	}, []);

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
						value={getCurrentDate().toString()}
						disabled
					/>
					{loading == true ? (
						<ActivityIndicator style={{ marginTop: 10 }} />
					) : (
						<Button mode='contained' style={styles.buttonSubmit} onPress={add}>
							<Text variant='bodyLarge' style={styles.ButtonText}>
								Submit
							</Text>
						</Button>
					)}
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
