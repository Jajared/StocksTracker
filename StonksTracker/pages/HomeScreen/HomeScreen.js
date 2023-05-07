import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, TouchableOpacity, Image, View } from "react-native";
import React, { useState } from "react";
import { FAB } from "@rneui/themed";
import StockDashboard from "../../components/Dashboard/StockDashboard/StockDashboard";
import AddPopUp from "../../components/PopUp/AddPopUp/AddPopUp";
import ValueIndex from "../../components/ValueIndex/ValueIndex";
import Piechart from "../../components/Piechart/Piechart";

export default function HomeScreen({ props, navigation }) {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => navigation.navigate("Transaction History")} style={styles.historyButtonContainer}>
        <Image source={require("../../assets/history-icon.png")} style={styles.historyButton} />
      </TouchableOpacity>
      <Piechart props={props.allStocksData} />
      <ValueIndex portfolioValue={props.portfolioValue} totalProfit={props.totalProfit} />
      <StockDashboard props={props.allStocksData} deleteStockData={props.deleteStock} />
      <FAB title="+" onPress={() => setAddModalVisible(true)} />
      <AddPopUp isVisible={isAddModalVisible} setVisible={setAddModalVisible} addStock={props.addStock} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  historyButtonContainer: {
    position: "absolute",
    top: 60,
    right: 30,
  },
  historyButton: {
    width: 30,
    height: 30,
  },
});
