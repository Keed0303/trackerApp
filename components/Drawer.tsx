import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Drawer as PaperDrawer } from "react-native-paper";

// Sample Screens
const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Home Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Profile Screen</Text>
  </View>
);

// Drawer Navigator
const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }: any) => (
  <PaperDrawer.Section>
    <PaperDrawer.Item
      label="Home"
      onPress={() => navigation.navigate("Home")}
    />
    <PaperDrawer.Item
      label="Profile"
      onPress={() => navigation.navigate("Profile")}
    />
  </PaperDrawer.Section>
);

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
