import React, { Component } from "react";
import { View, TouchableOpacity, Text, TextInput, Modal, StyleSheet, SafeAreaView } from "react-native";
export default class AddPopUp extends Component {
  state = {
    ticker: "",
    priceBought: 0,
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
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10 }} onChangeText={(text) => this.setState({ ticker: text })} placeholder="Ticker" />
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10 }} onChangeText={(text) => this.setState({ priceBought: +text })} placeholder="Price" />
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10 }} onChangeText={(text) => this.setState({ sharesBought: +text })} placeholder="Quantity" />
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
