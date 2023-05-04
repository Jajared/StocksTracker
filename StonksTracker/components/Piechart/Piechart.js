import PieChart from "react-native-pie-chart";
import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View, Dimensions } from "react-native";

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
    const { width, height } = Dimensions.get("window");
    const widthAndHeight = height * 0.15;
    const numOfStocks = this.props.props.length;
    const stockSeries = calculateSeries(this.props.props);
    const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"];

    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Portfolio</Text>
        {numOfStocks ? <PieChart widthAndHeight={widthAndHeight} series={stockSeries} sliceColor={sliceColor.slice(0, numOfStocks)} coverRadius={0.45} coverFill={"#FFF"} /> : <Text>No stocks in portfolio</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});
