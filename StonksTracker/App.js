import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import Piechart from "./components/Piechart/Piechart";
import { FAB } from "@rneui/themed";
import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
  const [piechartData, setPiechart] = useState([
    ["Stocks 1", 50],
    ["Stocks 2", 50],
  ]);

  const [allStocksData, setAllStocksData] = useState([
    { id: 1, Ticker: "AAPL", AveragePrice: 100, Shares: 20 },
    { id: 2, Ticker: "TSLA", AveragePrice: 200, Shares: 5 },
  ]);
  // Add new stock to portfolio
  function addStock(stockName, stockSeries) {
    var newData = [stockName, stockSeries];
    setPiechart((piechartData) => [...piechartData, newData]);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Piechart props={piechartData} />
      <Dashboard props={allStocksData} />
      <FAB title="+" onPress={() => addStock("Stock 3", 50)} />
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
