import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View, FlatList } from "react-native";
import StockData from "./StockData/StockData";

export default class StockDashboard extends Component {
  render() {
    var stocksData = this.props.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Ticker</Text>
          <Text>Shares</Text>
          <Text>Average Price</Text>
          <Text>Value</Text>
        </View>
        {stocksData && <FlatList data={stocksData} renderItem={(data) => <StockData title={data.Ticker} props={data} deleteStockData={this.props.deleteStockData} />} keyExtractor={(item) => item.Ticker} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "60%",
    width: "95%",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 5,
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});
