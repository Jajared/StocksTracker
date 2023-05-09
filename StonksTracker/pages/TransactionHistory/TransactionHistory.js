import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import TransactionDashboard from "../../components/Dashboard/TransactionDashboard/TransactionDashboard";

export default function TransactionHistory({ props, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.buttonContainer}>
        <Image source={require("../../assets/backarrow.png")} style={styles.backButton} />
      </TouchableOpacity>
      <Text style={styles.title}>Transaction History</Text>
      <TransactionDashboard props={props.transactionHistory} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    margin: 10,
  },
  buttonContainer: {
    position: "absolute",
    top: 60,
    left: 30,
  },
  backButton: {
    width: 30,
    height: 30,
  },
});
