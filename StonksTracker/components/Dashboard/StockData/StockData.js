import React, { Component } from "react";
import { View, Modal, Text, StyleSheet, TouchableOpacity, useState, TextInput, SafeAreaView } from "react-native";
import SellPopUp from "../../PopUp/AddPopUp/SellPopUp/SellPopUp";
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
    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => this.setState({ isModalVisible: true })}>
          <Text style={styles.text}>{this.props.props.item.Ticker}</Text>
          <Text style={styles.text}>{this.props.props.item.Shares}</Text>
          <Text style={styles.text}>{this.props.props.item.AveragePrice}</Text>
          <Text style={styles.text}>{this.props.props.item.TotalValue}</Text>
        </TouchableOpacity>
        <SellPopUp item={this.props.props.item} isVisible={this.state.isModalVisible} setVisible={this.setState} handleDeleteItem={this.handleDeleteItem} />
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
