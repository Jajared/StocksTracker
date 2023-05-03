import PieChart from "react-native-pie-chart";
import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";

export default class Piechart extends Component {
  render() {
    function calculateTotalValue(props) {
      var totalValue = 0;
      props.forEach((stock) => {
        const stockValue = stock.AveragePrice * stock.Shares;
        totalValue += stockValue;
      });
      return totalValue;
    }

    function calculateSeries(props) {
      const series = [];
      props.forEach((stock) => {
        const stockValue = stock.AveragePrice * stock.Shares;
        const stockPercentage = stockValue / calculateTotalValue(props);
        series.push(stockPercentage);
      });
      return series;
    }
    const widthAndHeight = 100;
    const numOfStocks = this.props.props.length;
    const stockSeries = calculateSeries(this.props.props);
    const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"];

    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Portfolio</Text>
        <PieChart widthAndHeight={widthAndHeight} series={stockSeries} sliceColor={sliceColor.slice(0, numOfStocks)} coverRadius={0.45} coverFill={"#FFF"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});
