import React, { Component } from "react";
import { View, TouchableOpacity, Text, TextInput, Modal, StyleSheet, SafeAreaView } from "react-native";
export default class AddPopUp extends Component {
  state = {
    ticker: "",
    priceBought: 0.0,
    sharesBought: 0,
  };
  handleSave() {
    this.props.addStock(this.state.ticker, this.state.priceBought, this.state.sharesBought);
    this.props.setVisible(false);
  }

  render() {
    return (
      <Modal visible={this.props.isVisible} animationType="slide">
        <SafeAreaView style={styles.modalView}>
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({ ticker: text })} placeholder="Ticker" placeholderTextColor="#808080" />
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({ priceBought: parseFloat(text) })} placeholder="Price" placeholderTextColor="#808080" />
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({ sharesBought: +text })} placeholder="Quantity" placeholderTextColor="#808080" />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.props.setVisible(false)} style={[styles.button, { backgroundColor: "red" }]}>
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
