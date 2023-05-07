import { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class ValueIndex extends Component {
  render() {
    const totalValue = Math.round((this.props.portfolioValue + Number.EPSILON) * 100) / 100;
    const totalProfit = Math.round((this.props.totalProfit + Number.EPSILON) * 100) / 100;
    const textColorValue = totalValue < 0 ? "#ff3c00" : "#007f00";
    const textColorProfit = totalProfit < 0 ? "#ff3c00" : "#007f00";
    const totalValueString = totalValue < 0 ? "-$" + (totalValue * -1).toString() : "$" + totalValue.toString();
    const totalProfitString = totalProfit < 0 ? "-$" + (totalProfit * -1).toString() : "+$" + totalProfit.toString();
    return (
      <View style={styles.container}>
        <View style={styles.totalValue}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total Value: </Text>
          <Text style={{ fontSize: 20, color: textColorValue }}>{totalValueString}</Text>
        </View>
        <Text style={{ textAlign: "center", marginBottom: 10, color: textColorProfit }}>{totalProfitString}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  totalValue: {
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flexDirection: "column",
  },
});
