import React, { Component } from "react";
import { View, Modal, Text, StyleSheet, TouchableOpacity, useState } from "react-native";

export default class StockData extends Component {
  state = {
    isModalVisible: false,
  };

  handleDeleteItem = (id) => {
    this.setState({ isModalVisible: false });
    this.props.deleteStockData(id);
  };

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => this.setState({ isModalVisible: true })}>
          <Text style={styles.text}>{this.props.props.item.Ticker}</Text>
          <Text style={styles.text}>{this.props.props.item.Shares}</Text>
          <Text style={styles.text}>{this.props.props.item.Shares * this.props.props.item.AveragePrice}</Text>
        </TouchableOpacity>
        <Modal visible={this.state.isModalVisible} animationType="slide">
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => this.handleDeleteItem(this.props.props.item.id)}>
              <Text style={styles.deleteButton}>Delete Item</Text>
            </TouchableOpacity>
          </View>
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
});
