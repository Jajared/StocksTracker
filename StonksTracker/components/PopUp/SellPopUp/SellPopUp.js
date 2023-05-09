import { Component } from "react";
import { View, Modal, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from "react-native";

export default class SellPopUp extends Component {
  state = {
    sharesSold: 0,
    priceSold: 0.0,
  };
  render() {
    return (
      <Modal visible={this.props.isVisible} animationType="slide">
        <SafeAreaView style={styles.modalView}>
          <Text style={styles.textInput}>{this.props.item.Ticker}</Text>
          <TextInput style={styles.textInput} placeholder="Number of Shares" keyboardType="numeric" onChangeText={(text) => this.setState({ sharesSold: +text })} placeholderTextColor="#808080" />
          <TextInput style={styles.textInput} placeholder="Price Sold" keyboardType="numeric" onChangeText={(text) => this.setState({ priceSold: parseFloat(text) })} placeholderTextColor="#808080" />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.props.setVisible({ isModalVisible: false })} style={styles.cancelButton}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.handleDeleteItem(this.props.item.Ticker, this.state.sharesSold, this.state.priceSold)} style={styles.sellButton}>
              <Text>Sell</Text>
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
  sellButton: {
    backgroundColor: "red",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
    fontSize: 18,
    width: "30%",
    marginHorizontal: 10,
  },
  cancelButton: {
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    fontSize: 18,
    color: "red",
    padding: 10,
    width: "30%",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});
