import React, { Component } from "react";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import Modal from "react-native-modal";

class AddPopUp extends Component {
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
      <Modal visible={isVisible} animationType="slide" backdropColor="black" backdropOpacity={0.7} avoidKeyboard={true}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={{ fontSize: 20 }}>Close</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20 }}>
            <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10 }} onChangeText={(text) => this.setState({ Ticker: text })} placeholder="Ticker" />
            <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10 }} onChangeText={(text) => this.setState({ AveragePrice: text })} placeholder="Price" />
            <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10 }} onChangeText={(text) => this.setState({ Shares: text })} placeholder="Quantity" />
            <TouchableOpacity onPress={() => this.handleSave()}>
              <Text style={{ fontSize: 20 }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default AddPopUp;
