import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View, FlatList } from "react-native";
import TransactionData from "./TransactionData/TransactionData";

export default class TransactionDashboard extends Component {
  render() {
    var stocksData = this.props.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Action</Text>
          <Text>Ticker</Text>
          <Text>Shares</Text>
          <Text>Price</Text>
        </View>
        {stocksData && <FlatList data={stocksData} renderItem={(data) => <TransactionData title={data.Ticker} props={data} />} keyExtractor={(item) => item.transaction_id} />}
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
