import React, { Component } from "react";
import { View, Modal, Text, StyleSheet, TouchableOpacity, useState, TextInput, SafeAreaView } from "react-native";

export default class StockData extends Component {
  state = {
    isModalVisible: false,
    sharesSold: 0,
    priceSold: 0,
  };

  handleDeleteItem = (ticker) => {
    this.setState({ isModalVisible: false });
    this.props.deleteStockData(ticker, this.state.sharesSold, this.state.priceSold);
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
        <Modal visible={this.state.isModalVisible} animationType="slide">
          <SafeAreaView style={styles.modalView}>
            <TextInput style={styles.input} placeholder="Number of Shares" keyboardType="numeric" onChangeText={(text) => this.setState({ sharesSold: text })} />
            <TextInput style={styles.input} placeholder="Price Sold" keyboardType="numeric" onChangeText={(text) => this.setState({ priceSold: text })} />
            <TouchableOpacity onPress={() => this.handleDeleteItem(this.props.props.item.Ticker)}>
              <Text style={styles.deleteButton}>Sell</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ isModalVisible: false })}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
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
  modalView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 0,
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  cancelButton: {
    marginLeft: 10,
    fontSize: 18,
    color: "red",
  },
});
