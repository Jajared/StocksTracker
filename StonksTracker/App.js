import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import Piechart from "./components/Piechart/Piechart";
import { FAB } from "@rneui/themed";
import Dashboard from "./components/Dashboard/Dashboard";
import AddPopUp from "./components/PopUp/AddPopUp/AddPopUp";
import ValueIndex from "./components/ValueIndex/ValueIndex";

export default function App() {
  const [allStocksData, setAllStocksData] = useState([
    { Ticker: "AAPL", AveragePrice: 100, Shares: 20, TotalValue: 2000 },
    { Ticker: "TSLA", AveragePrice: 200, Shares: 5, TotalValue: 1000 },
  ]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  // Delete stock from portfolio
  function deleteStock(ticker, sharesSold, priceSold) {
    var currentStock = allStocksData.find((stock) => stock.Ticker === ticker);
    function updateStock(currentStock, sharesSold, priceSold) {
      var newValue = currentStock.TotalValue - sharesSold * currentStock.AveragePrice;
      var sharesRemaining = currentStock.Shares - sharesSold;
      return { ...currentStock, TotalValue: newValue, Shares: sharesRemaining };
    }
    var newAllStocksData = [...allStocksData];
    var newStockData = updateStock(currentStock, +sharesSold, +priceSold);
    if (newStockData.Shares === 0) {
      newAllStocksData = allStocksData.filter((stock) => stock.Ticker !== ticker);
    } else {
      newAllStocksData[newAllStocksData.indexOf(currentStock)] = newStockData;
    }
    setAllStocksData(newAllStocksData);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Piechart props={allStocksData} />
      <ValueIndex stocksData={allStocksData} />
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
