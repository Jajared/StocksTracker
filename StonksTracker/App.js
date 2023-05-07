import React from "react";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import TransactionHistory from "./pages/TransactionHistory/TransactionHistory";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Transaction History" component={TransactionHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
