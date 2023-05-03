import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import Piechart from "./components/Piechart/Piechart";
import { FAB } from "@rneui/themed";
import Dashboard from "./components/Dashboard/Dashboard";
import AddPopUp from "./components/AddPopUp/AddPopUp";

export default function App() {
  const [allStocksData, setAllStocksData] = useState([
    { Ticker: "AAPL", AveragePrice: 100, Shares: 20 },
    { Ticker: "TSLA", AveragePrice: 200, Shares: 5 },
  ]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  // Delete stock from portfolio
  function deleteStock(ticker) {
    const newAllStocksData = allStocksData.filter((stock) => stock.Ticker !== ticker);
    setAllStocksData(newAllStocksData);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Piechart props={allStocksData} />
      <Dashboard props={allStocksData} deleteStockData={deleteStock} />
      <FAB title="+" onPress={() => setAddModalVisible(true)} />
      <AddPopUp props={isAddModalVisible} setProps={setAddModalVisible} stocksData={allStocksData} setStocksData={setAllStocksData} />
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
});
