import { Income } from "@/Types/Income";
import { Link } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { HoverEffect } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

interface ListItemProps {
	data: Income;
}

const ListItem = ({ data }: ListItemProps) => {
	const [isPressed, setIsPressed] = useState(false);

	return (
		<Link
			href={{
				pathname: "/(tabs)/home/[details]",
				params: { id: data.id, details: data.id },
			}}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			style={[styles.listContainer, isPressed && styles.pressed]}>
			<View style={styles.listWrapper}>
				<Text>{data.purpose}</Text>
				<Text style={{ color: "green", fontWeight: "700" }}>
					+ {data.amount}
				</Text>
			</View>
		</Link>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		backgroundColor: "#f3f3f3",
		padding: 16,
		borderRadius: 10,
	},
	listWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	pressed: {
		backgroundColor: "#e3e3e3",
	},
});

export default ListItem;
