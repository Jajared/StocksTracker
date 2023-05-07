import React, { Component } from "react";
import { View, Modal, Text, StyleSheet, TouchableOpacity, useState, TextInput, SafeAreaView } from "react-native";

export default class StockData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
    this.setState = this.setState.bind(this);
  }
  handleDeleteItem = (ticker, sharesSold, priceSold) => {
    this.setState({ isModalVisible: false });
    this.props.deleteStockData(ticker, sharesSold, priceSold);
  };

  render() {
    const actionColor = this.props.props.item.Action == "Sell" ? "#ff3c00" : "#007f00";
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { color: actionColor }]}>{this.props.props.item.Action}</Text>
        <Text style={styles.text}>{this.props.props.item.Ticker}</Text>
        <Text style={styles.text}>{this.props.props.item.Shares}</Text>
        <Text style={styles.text}>{Math.round((this.props.props.item.Price + Number.EPSILON) * 100) / 100}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 60,
  },
  text: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});
