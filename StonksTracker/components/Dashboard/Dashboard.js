import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View, FlatList } from "react-native";
import StockData from "./StockData/StockData";

export default class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Ticker</Text>
          <Text>Shares</Text>
          <Text>Value</Text>
        </View>
        <FlatList data={this.props.props} renderItem={(data) => <StockData title={data.Ticker} props={data} deleteStockData={this.props.deleteStockData} />} keyExtractor={(item) => item.id} />
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
