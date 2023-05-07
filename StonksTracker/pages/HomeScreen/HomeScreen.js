import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Button, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { FAB } from "@rneui/themed";
import Dashboard from "../../components/Dashboard/Dashboard";
import AddPopUp from "../../components/PopUp/AddPopUp/AddPopUp";
import ValueIndex from "../../components/ValueIndex/ValueIndex";
import Piechart from "../../components/Piechart/Piechart";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("stocksDB.db");

export default function HomeScreen({ navigation }) {
  // Create table in database
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS stockDb (Ticker TEXT PRIMARY KEY, Shares INT, AveragePrice INT, TotalValue INT)",
        [],
        (tx, results) => {
          console.log("Table created successfully");
        },
        (error) => {
          console.log("Error occurred while creating the table:", error);
        }
      );
    });
  };

  // Insert data into database
  const initialiseData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO stockDb (Ticker, Shares, AveragePrice, TotalValue) VALUES (?, ?, ?, ?)",
        ["AAPL", 10, 150, 1500],
        (tx, results) => {
          console.log("Data inserted successfully");
        },
        (error) => {
          console.log("Error occurred while inserting data:", error);
        }
      );
    });
  };

  // Get data from database
  const getData = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM stockDb",
          [],
          (tx, results) => {
            var len = results.rows.length;
            var data = [];
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              data.push(row);
            }
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  };

  function addData(ticker, averagePrice, shares) {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO stockDb (Ticker, Shares, AveragePrice, TotalValue) VALUES (?, ?, ?, ?)",
        [ticker, shares, averagePrice, shares * averagePrice],
        (tx, results) => {
          console.log("Data inserted successfully");
          getData()
            .then((data) => {
              setAllStocksData(data);
              recalculatePortfolioValue(data);
            })
            .catch((error) => {
              console.log("Error occurred while retrieving data:", error);
            });
        },
        (error) => {
          console.log("Error occurred while inserting data:", error);
        }
      );
    });
  }

  // Update data in database
  function updateData(ticker, newAveragePrice, newShares) {
    db.transaction((tx) => {
      if (newShares === 0) {
        tx.executeSql(
          "DELETE FROM stockDb WHERE Ticker = ?",
          [ticker],
          (tx, results) => {
            console.log("Data deleted successfully");
            getData()
              .then((data) => {
                setAllStocksData(data);
                recalculatePortfolioValue(data);
              })
              .catch((error) => {
                console.log("Error occurred while retrieving data:", error);
              });
          },
          (error) => {
            console.log("Error occurred while deleting data:", error);
          }
        );
      } else {
        tx.executeSql(
          "UPDATE stockDb SET AveragePrice = ?, Shares = ?, TotalValue = ? WHERE Ticker = ?",
          [newAveragePrice, newShares, newAveragePrice * newShares, ticker],
          (tx, results) => {
            console.log("Data updated successfully");
            getData()
              .then((data) => {
                setAllStocksData(data);
                recalculatePortfolioValue(data);
              })
              .catch((error) => {
                console.log("Error occurred while retrieving data:", error);
              });
          },
          (error) => {
            console.log("Error occurred while updating data:", error);
          }
        );
      }
    });
  }

  // Get initial data (initial mount)
  useEffect(() => {
    createTable();
    initialiseData();
    getData()
      .then((data) => {
        setAllStocksData(data);
        recalculatePortfolioValue(data);
      })
      .catch((error) => {
        console.log("Error occurred while retrieving data:", error);
      });
  }, []);

  const [allStocksData, setAllStocksData] = useState([]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(0);
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
    var sharesRemaining = currentStock.Shares - sharesSold;
    var profit = sharesSold * (priceSold - currentStock.AveragePrice);
    setTotalProfit(totalProfit + profit);
    updateData(ticker, currentStock.AveragePrice, sharesRemaining);
  }

  function addStock(ticker, price, quantity) {
    if (allStocksData.some((stock) => stock.Ticker === ticker)) {
      var currentStock = allStocksData.find((stock) => stock.Ticker === ticker);
      var currentShares = currentStock.Shares;
      var currentAveragePrice = currentStock.AveragePrice;
      var currentTotalValue = currentShares * currentAveragePrice;
      var newTotalValue = currentTotalValue + quantity * price;
      var newAveragePrice = newTotalValue / (currentShares + quantity);
      updateData(ticker, newAveragePrice, currentShares + quantity);
    } else {
      addData(ticker, price, quantity);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Piechart props={allStocksData} />
      <ValueIndex portfolioValue={portfolioValue} totalProfit={totalProfit} />
      <Dashboard props={allStocksData} deleteStockData={deleteStock} />
      <FAB title="+" onPress={() => setAddModalVisible(true)} />
      <Button title="Navigate" onPress={() => navigation.navigate("Transaction History")}></Button>
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
