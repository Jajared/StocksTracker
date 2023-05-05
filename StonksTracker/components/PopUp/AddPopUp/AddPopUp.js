import React, { Component } from "react";
import { View, TouchableOpacity, Text, TextInput, Modal, StyleSheet, SafeAreaView } from "react-native";
export default class AddPopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Ticker: "",
      AveragePrice: "",
      Shares: "",
      isVisible: this.props.props,
      setVisible: this.props.setProps,
    };
  }

  addStock(ticker, price, quantity) {
    var currentStocksData = this.props.stocksData;
    function recalculateAveragePrice(currentStock, price, quantity) {
      var currentShares = currentStock.Shares;
      var currentAveragePrice = currentStock.AveragePrice;
      var currentTotalValue = currentShares * currentAveragePrice;
      var newTotalValue = currentTotalValue + quantity * price;
      var newAveragePrice = newTotalValue / (currentShares + quantity);
      return { ...currentStock, AveragePrice: newAveragePrice, Shares: currentShares + quantity, TotalValue: newTotalValue };
    }

    if (currentStocksData.some((stock) => stock.Ticker === ticker)) {
      // Stock already exists
      var currentStock = currentStocksData.find((stock) => stock.Ticker === ticker);
      var newStocksData = [...currentStocksData];
      newStocksData[newStocksData.indexOf(currentStock)] = recalculateAveragePrice(currentStock, +price, +quantity);
      this.props.setStocksData(newStocksData);
    } else {
      // Stock does not exist
      var newData = { Ticker: ticker, AveragePrice: +price, Shares: +quantity, TotalValue: +price * +quantity };
      this.props.setStocksData((allStocksData) => [...allStocksData, newData]);
    }
  }

  handleSave() {
    this.addStock(this.state.Ticker, this.state.AveragePrice, this.state.Shares);
    this.state.setVisible(false);
  }

  render() {
    const isVisible = this.props.props;
    const setVisible = this.props.setProps;
    return (
      <Modal visible={isVisible} animationType="slide">
        <SafeAreaView style={styles.modalView}>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10 }} onChangeText={(text) => this.setState({ Ticker: text })} placeholder="Ticker" />
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10 }} onChangeText={(text) => this.setState({ AveragePrice: text })} placeholder="Price" />
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10 }} onChangeText={(text) => this.setState({ Shares: text })} placeholder="Quantity" />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setVisible(false)} style={[styles.button, { backgroundColor: "red" }]}>
              <Text>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSave()} style={[styles.button, { backgroundColor: "green" }]}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
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
  textInput: {
    height: 40,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  button: {
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
    fontSize: 18,
    width: "30%",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});
