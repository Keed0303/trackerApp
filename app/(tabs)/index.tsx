import {
	Image,
	StyleSheet,
	Platform,
	View,
	Text,
	StatusBar,
	TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { PaperProvider, Button, Appbar  } from "react-native-paper";
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function HomeScreen() {
	const [money, setMoney] = useState(0);

	return (
		<>
      <PaperProvider>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Money Tracker" />
      </Appbar.Header>

				<SafeAreaProvider>
					<SafeAreaView style={styles.container}>
						<StatusBar
							animated={true}
							backgroundColor='white'
							barStyle='dark-content'
							showHideTransition='none'
							hidden={false}
						/>

						<View style={styles.cardContainer}>
							<Text style={styles.moneyText}>{"₱" + money}</Text>
							<Text>Available Balance</Text>
						</View>

						<View style={styles.addController}>
							<View style={styles.addWrapper}>
								<View>
									<Link href='/modal/addIncome' asChild>
										<TouchableOpacity style={styles.addIncomeButton}>
											<Text>Add Income</Text>
										</TouchableOpacity>
									</Link>
								</View>

								<View>
									<Link href='/modal/addExpenses' asChild>
										<TouchableOpacity style={styles.addExpensesButton}>
											<Text>Add Expenses</Text>
										</TouchableOpacity>
									</Link>
								</View>
							</View>
						</View>
					</SafeAreaView>
				</SafeAreaProvider>
			</PaperProvider>
		</>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
	cardContainer: {
		backgroundColor: "#2f64f7",
		height: 125,
		borderRadius: 16,
		padding: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		padding: 16,
	},
	moneyText: {
		fontSize: 40,
		color: "#ffffff",
	},
	addController: {
		padding: 16,
		marginVertical: 16,
		backgroundColor: "#ffffff",
		borderRadius: 25,
	},
	addWrapper: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	addIncomeButton: {},
	addExpensesButton: {},
	Container: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
		padding: 36,
		alignItems: "center",
	},
});
