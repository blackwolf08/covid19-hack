import React, { Component } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const { width, height } = Dimensions.get("window");

export default class Chart extends Component {
  render() {
    let { data, color } = this.props;
    return (
      <LineChart
        data={{
          datasets: [
            {
              data
            }
          ]
        }}
        width={width * 0.7}
        height={height * 0.2}
        yAxisInterval={1}
        formatYLabel={label => ""}
        chartConfig={{
          color: () => color,
          backgroundGradientFrom: "#fff",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#fff",
          backgroundGradientToOpacity: 0,
          strokeWidth: 2,
          barPercentage: 0.5,
          propsForDots: {
            r: "0",
            strokeWidth: "0",
            stroke: color
          },
          propsForBackgroundLines: {
            opacity: 0
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    );
  }
}
