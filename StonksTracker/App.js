import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
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
  const [portfolioValue, setPortfolioValue] = useState(() => {
    var totalValue = 0;
    allStocksData.forEach((stock) => {
      totalValue += stock.TotalValue;
    });
    return totalValue;
  });
  const [totalProfit, setTotalProfit] = useState(0);

  function recalculatePortfolioValue(allStocksData) {
    var totalValue = 0;
    allStocksData.forEach((stock) => {
      totalValue += stock.TotalValue;
    });
    setPortfolioValue(totalValue);
  }

  // Delete stock from portfolio
  function deleteStock(ticker, sharesSold, priceSold) {
    var currentStock = allStocksData.find((stock) => stock.Ticker === ticker);
    function updateStock(currentStock, sharesSold, priceSold) {
      var newValue = currentStock.TotalValue - sharesSold * currentStock.AveragePrice;
      var sharesRemaining = currentStock.Shares - sharesSold;
      var profit = sharesSold * (priceSold - currentStock.AveragePrice);
      setTotalProfit(totalProfit + profit);
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
    recalculatePortfolioValue(newAllStocksData);
  }

  function addStock(ticker, price, quantity) {
    function recalculateAveragePrice(currentStock, price, quantity) {
      var currentShares = currentStock.Shares;
      var currentAveragePrice = currentStock.AveragePrice;
      var currentTotalValue = currentShares * currentAveragePrice;
      var newTotalValue = currentTotalValue + quantity * price;
      var newAveragePrice = newTotalValue / (currentShares + quantity);
      return { ...currentStock, AveragePrice: newAveragePrice, Shares: currentShares + quantity, TotalValue: newTotalValue };
    }
    var newAllStocksData = [...allStocksData];
    if (newAllStocksData.some((stock) => stock.Ticker === ticker)) {
      // Stock already exists
      var currentStock = newAllStocksData.find((stock) => stock.Ticker === ticker);
      newAllStocksData[newAllStocksData.indexOf(currentStock)] = recalculateAveragePrice(currentStock, +price, +quantity);
    } else {
      // Stock does not exist
      var newData = { Ticker: ticker, AveragePrice: +price, Shares: +quantity, TotalValue: +price * +quantity };
      newAllStocksData.push(newData);
    }
    setAllStocksData(newAllStocksData);
    recalculatePortfolioValue(newAllStocksData);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Piechart props={allStocksData} />
      <ValueIndex portfolioValue={portfolioValue} totalProfit={totalProfit} />
      <Dashboard props={allStocksData} deleteStockData={deleteStock} />
      <FAB title="+" onPress={() => setAddModalVisible(true)} />
      <AddPopUp isVisible={isAddModalVisible} setVisible={setAddModalVisible} addStock={addStock} />
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
