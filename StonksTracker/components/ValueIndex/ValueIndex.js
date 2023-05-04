import { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class ValueIndex extends Component {
  render() {
    var stocksData = this.props.stocksData;
    var totalValue = 0;
    stocksData.forEach((stock) => {
      totalValue += stock.TotalValue;
    });
    const textColor = totalValue < 0 ? "#ff3c00" : "#007f00";
    const totalValueString = totalValue < 0 ? "-$" + (totalValue * -1).toString() : "$" + totalValue.toString();
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total Value: </Text>
        <Text style={{ fontSize: 20, color: textColor }}>{totalValueString}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
