import React from "react";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import TransactionHistory from "./pages/TransactionHistory/TransactionHistory";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

const Stack = createNativeStackNavigator();
const db = SQLite.openDatabase("stocksDB.db");

export default function App() {
  const [allStocksData, setAllStocksData] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Initialise table in database
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS profitDb (id INTEGER PRIMARY KEY, Profit INTEGER)",
        [],
        (tx, results) => {
          console.log("profitDb table created successfully");
        },
        (error) => {
          console.log("Error occurred while creating the profitDb table:", error);
        }
      );

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS stocksDb (Ticker TEXT PRIMARY KEY, Shares INT, AveragePrice INT, TotalValue INT)",
        [],
        (tx, results) => {
          console.log("stocksDb table created successfully");
        },
        (error) => {
          console.log("Error occurred while creating the stocksDb table:", error);
        }
      );

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS historyDb (transaction_id INTEGER PRIMARY KEY AUTOINCREMENT, Ticker Text, Action TEXT, Shares INT, Price INT)",
        [],
        (tx, results) => {
          console.log("historyDb table created successfully");
        },
        (error) => {
          console.log("Error occurred while creating the historyDb table:", error);
        }
      );
    });
  };

  // For testing purposes
  function clearTable() {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM stocksDb",
        [],
        (tx, results) => {
          console.log("stocksDb table cleared successfully");
        },
        (error) => {
          console.log("Error occurred while clearing the stocksDb table:", error);
        }
      );

      tx.executeSql(
        "DELETE FROM historyDb",
        [],
        (tx, results) => {
          console.log("historyDb table cleared successfully");
        },
        (error) => {
          console.log("Error occurred while clearing the historyDb table:", error);
        }
      );
    });
  }

  // Get stocksData from database
  const getStocksData = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM stocksDb",
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

  // Get Transaction History from database
  const getTransactionHistoryData = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM historyDb",
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
        "INSERT INTO stocksDb (Ticker, Shares, AveragePrice, TotalValue) VALUES (?, ?, ?, ?)",
        [ticker, shares, averagePrice, shares * averagePrice],
        (tx, results) => {
          console.log("Data inserted successfully");
          getStocksData()
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

  function updateTransactionHistory(action, ticker, shares, price) {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO historyDb (Action, Ticker, Shares, Price) VALUES (?, ?, ?, ?)",
        [action, ticker, shares, price],
        (tx, results) => {
          console.log("Data inserted successfully");
          getTransactionHistoryData()
            .then((data) => {
              setTransactionHistory(data);
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
  function updateStockData(ticker, newAveragePrice, newShares) {
    db.transaction((tx) => {
      if (newShares === 0) {
        tx.executeSql(
          "DELETE FROM stocksDb WHERE Ticker = ?",
          [ticker],
          (tx, results) => {
            console.log("Data deleted successfully");
            getStocksData()
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
          "UPDATE stocksDb SET AveragePrice = ?, Shares = ?, TotalValue = ? WHERE Ticker = ?",
          [newAveragePrice, newShares, newAveragePrice * newShares, ticker],
          (tx, results) => {
            console.log("Data updated successfully");
            getStocksData()
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

  // Get profit data from database
  const getProfitData = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM profitDb",
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

  // Set profit data on database
  function setProfitData(id, profit) {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT OR REPLACE INTO profitDb (id, profit) VALUES (?, ?)",
        [id, profit],
        (tx, results) => {
          console.log("Data updated successfully");
        },
        (error) => {
          console.log("Error occurred while updating data:", error);
        }
      );
    });
  }

  // Get initial data (initial mount)
  useEffect(() => {
    createTable();
    getStocksData()
      .then((data) => {
        setAllStocksData(data);
        recalculatePortfolioValue(data);
      })
      .catch((error) => {
        console.log("Error occurred while retrieving data:", error);
      });
    getTransactionHistoryData()
      .then((data) => {
        setTransactionHistory(data);
      })
      .catch((error) => {
        console.log("Error occurred while retrieving data:", error);
      });
    getProfitData()
      .then((data) => {
        setTotalProfit(data[0].Profit);
      })
      .catch((error) => {
        console.log("Error occurred while retrieving data:", error);
      });
  }, []);

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
    if (sharesRemaining < 0) {
      alert("Cannot sell more shares than you own");
      return;
    } else {
      var profit = sharesSold * (priceSold - currentStock.AveragePrice);
      setProfitData(1, totalProfit + profit);
      setTotalProfit(totalProfit + profit);
      updateStockData(ticker, currentStock.AveragePrice, sharesRemaining);
      updateTransactionHistory("Sell", ticker, sharesSold, priceSold);
    }
  }

  function addStock(ticker, price, quantity) {
    if (allStocksData.some((stock) => stock.Ticker === ticker)) {
      var currentStock = allStocksData.find((stock) => stock.Ticker === ticker);
      var currentShares = currentStock.Shares;
      var currentAveragePrice = currentStock.AveragePrice;
      var currentTotalValue = currentShares * currentAveragePrice;
      var newTotalValue = currentTotalValue + quantity * price;
      var newAveragePrice = newTotalValue / (currentShares + quantity);
      updateStockData(ticker, newAveragePrice, currentShares + quantity);
    } else {
      addData(ticker, price, quantity);
    }
    updateTransactionHistory("Buy", ticker, quantity, price);
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <HomeScreen {...props} props={{ allStocksData: allStocksData, portfolioValue: portfolioValue, totalProfit: totalProfit, deleteStock: deleteStock, addStock: addStock }} />}
        </Stack.Screen>
        <Stack.Screen name="Transaction History" options={{ headerShown: false }}>
          {(props) => <TransactionHistory {...props} props={{ transactionHistory: transactionHistory, deleteStock: () => {} }} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
