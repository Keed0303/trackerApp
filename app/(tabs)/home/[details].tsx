import { View, StyleSheet, ToastAndroid, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
	ActivityIndicator,
	TextInput,
	Text,
	Button,
	Snackbar,
} from "react-native-paper";
import { Income } from "@/Types/Income";
import firestore from "@react-native-firebase/firestore";
export default function DetailScreen() {
	const [amount, setAmount] = useState("");
	const [purpose, setPurpose] = useState("");
	const [loading, setLoading] = useState(false);
	const [income, setIncome] = useState<Income[]>([]);
	const date = new Date();
	const router = useRouter();
	const { id } = useLocalSearchParams();

	console.log(id);

	const getCurrentDate = () => {
		var date = new Date().getDate();
		var month = new Date().getMonth() + 1;
		var year = new Date().getFullYear();
		return date + "-" + month + "-" + year; //format: d-m-y;
	};

	useEffect(() => {
		setLoading(true);
		firestore()
			.collection("income")
			.doc(id.toString())
			.get()
			.then((response) => {
				if (response.exists) {
					const data: any = response.data();
					setAmount(data.amount);
					setPurpose(data.purpose);
					setIncome(data);
				}
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching document: ", error);
				setLoading(false);
			});
	}, [id]);

	const deleteIncome = () => {

		firestore()
			.collection("income")
			.doc(id.toString())
			.delete()
			.then(() => {
				console.log("User deleted!");
				router.replace("/(tabs)/home");
			});
};
  
const alertRemoveIncome = () => {
  Alert.alert(
    "Warning!",
    "Deleting this income is permanent and cannot be undone.",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        onPress: () => deleteIncome
      }
    ]
    
  );
}

	return (
		<View>
			<Text>Details of user {id} </Text>
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
						<Button mode='contained' style={styles.buttonSubmit}>
							<Text variant='bodyLarge' style={styles.ButtonText}>
								Update
							</Text>
						</Button>
					)}
					<Button
						mode='contained'
						style={styles.buttonDelete}
						onPress={alertRemoveIncome}>
						<Text variant='bodyLarge' style={styles.ButtonText}>
							Remove
						</Text>
					</Button>
				</View>
			</View>
		</View>
	);
}

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
	buttonDelete: {
		backgroundColor: "#ee636d",
		marginTop: 10,
	},
	ButtonText: {
		color: "#ffffff",
	},
});
