import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import Piechart from "./components/Piechart/Piechart";
import { FAB } from "@rneui/themed";
import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
  const [allStocksData, setAllStocksData] = useState([
    { id: 1, Ticker: "AAPL", AveragePrice: 100, Shares: 20 },
    { id: 2, Ticker: "TSLA", AveragePrice: 200, Shares: 5 },
  ]);
  // Add new stock to portfolio
  function addStock() {
    var newData = { id: allStocksData.length + 1, Ticker: "Test", AveragePrice: 100, Shares: 2 };
    setAllStocksData((allStocksData) => [...allStocksData, newData]);
  }

  function deleteStock(id) {
    const newAllStocksData = allStocksData.filter((stock) => stock.id !== id);
    setAllStocksData(newAllStocksData);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Piechart props={allStocksData} />
      <Dashboard props={allStocksData} deleteStockData={deleteStock} />
      <FAB title="+" onPress={() => addStock()} />
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
