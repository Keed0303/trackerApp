import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, TextInput, Text, Button } from 'react-native-paper';
import { Income } from '@/Types/Income';
import firestore from "@react-native-firebase/firestore";
export default function DetailScreen() {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState<Income[]>([])
  const date = new Date();

  const { id } = useLocalSearchParams();

  console.log(id);
  
  const getCurrentDate=()=>{
 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year;//format: d-m-y;
  }

  useEffect(() => {
    setLoading(true);
    firestore().collection('income').doc(id.toString()).get().then(response => {
      if (response.exists) {
        const data: any = response.data();
        setAmount(data.amount);
        setPurpose(data.purpose);
        setIncome(data);
      }
      setLoading(false);
    }).catch(error => {
      console.error("Error fetching document: ", error);
      setLoading(false);
    });
  }, [id]);
  

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
								Submit
							</Text>
						</Button>
					)}
				</View>
			</View>
    </View>
  )
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
  ButtonText: {
    color: "#ffffff",
  },
});