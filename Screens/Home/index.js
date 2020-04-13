import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from "react-native";
import CoronaImage from "../../assets/home.jpg";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Chart from "./components/Chart";
import Chatbot from "../Chatbot";
import LocationBF from "../../components/LocationBF";
import Map from "../Map";

const red = "#FC312F";
const green = "#29AF62";

const { width, height } = Dimensions.get("window");

export default class Home extends Component {
  state = {
    loading: true,
    dataRecovered: {},
    totalCases: "",
    dataConfirmed: {},
    recoveredCases: "",
    newsLoaded: false,
  };
  async componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    this.setState({
      refreshing: true,
      loading: true,
    });
    let res = await axios.get("https://api.covid19india.org/data.json");
    let { cases_time_series } = res.data;
    let dataConfirmed = cases_time_series.map((entry) => entry.totalconfirmed);
    let dataRecovered = cases_time_series.map((entry) => entry.totalrecovered);
    let dataDeceased = cases_time_series.map((entry) => entry.totaldeceased);
    let {
      dailyconfirmed,
      dailydeceased,
      dailyrecovered,
      totalconfirmed,
      totaldeceased,
      totalrecovered,
    } = cases_time_series[cases_time_series.length - 1];
    this.setState({
      dataRecovered,
      dataConfirmed,
      dataDeceased,
      loading: false,
      totalconfirmed,
      totaldeceased,
      dailyconfirmed,
      dailydeceased,
      totalrecovered,
      dailyrecovered,
      refreshing: false,
    });
  };
  render() {
    const {
      loading,
      dataConfirmed,
      dataRecovered,
      totalconfirmed,
      totaldeceased,
      dailyconfirmed,
      dailydeceased,
      totalrecovered,
      dailyrecovered,
      dataDeceased,
    } = this.state;
    if (loading) {
      return (
        <View style={styles.loadingConatiner}>
          <Image
            style={styles.loadingGif}
            source={require("../../assets/loading.gif")}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchData}
            />
          }
        >
          {/* <Image source={CoronaImage} style={styles.headerImage} /> */}
          <Map />

          <View style={styles.content}>
            <View style={{ height: height * 0.3 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.chartsScrollViewContainer}>
                  {/* ----------- confirmed chart starts here -------------- */}

                  <View style={styles.flexStartConatier}>
                    <Text style={styles.chartTitle}>
                      {"Total Confirmed "}
                      <AntDesign color="#FC312F" name="caretup" />
                    </Text>
                    <Text style={styles.chartNumbers}>{totalconfirmed}</Text>
                  </View>
                  <View style={styles.charts}>
                    <Chart data={dataConfirmed} color={red} />
                  </View>
                </View>
                {/* ----------- recovered chart starts here -------------- */}
                <View style={styles.chartContainer}>
                  <View style={styles.flexStartConatier}>
                    <Text style={styles.chartTitle}>
                      {"Total Recovered "}
                      <AntDesign color="#29AF62" name="caretup" />
                    </Text>
                    <Text style={styles.chartNumbers}>{totalrecovered}</Text>
                  </View>
                  <View style={styles.charts}>
                    <Chart data={dataRecovered} color={green} />
                  </View>
                </View>
                {/* ----------- deceased chart starts here -------------- */}
                <View style={styles.chartContainer}>
                  <View style={styles.flexStartConatier}>
                    <Text style={styles.chartTitle}>
                      {"Total Deceased "}
                      <AntDesign color="#FC312F" name="caretup" />
                    </Text>
                    <Text style={styles.chartNumbers}>{totaldeceased}</Text>
                  </View>
                  <View style={styles.charts}>
                    <Chart data={dataDeceased} color={red} />
                  </View>
                </View>
              </ScrollView>
            </View>
            {/* ----------- India new stats starts here -------------- */}

            <View style={styles.moreInfoConatiner}>
              <Text
                style={{
                  opacity: 0.7,
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                COVID-19 India Stats
              </Text>

              <View style={styles.moreInfoInnerConatiner}>
                <Text style={[styles.moreInfoText, { flex: 2 }]}>
                  Recently Confirmed
                </Text>
                <Text style={[styles.moreInfoText, { color: red }]}>
                  {dailyconfirmed}
                </Text>
              </View>
              <View style={styles.moreInfoInnerConatiner}>
                <Text style={[styles.moreInfoText, { flex: 2 }]}>
                  Recently Recovered
                </Text>
                <Text style={[styles.moreInfoText, { color: green }]}>
                  {dailyrecovered}
                </Text>
              </View>
              <View style={styles.moreInfoInnerConatiner}>
                <Text style={[styles.moreInfoText, { flex: 2 }]}>
                  Recently Deceased
                </Text>
                <Text style={[styles.moreInfoText, { color: red }]}>
                  {dailydeceased}
                </Text>
              </View>
            </View>
            {/* ----------- map starts here -------------- */}

            <View style={styles.mapConatiner}>
              <Image
                style={styles.mapImage}
                source={require("../../assets/map.png")}
              />
            </View>
            {/* ----------- pm donate starts here -------------- */}

            <View style={styles.pmFundsConatiner}>
              <Image
                style={styles.pmFundsImage}
                source={require("../../assets/pmdonate.png")}
              />
            </View>
          </View>
        </ScrollView>
        <Chatbot />
        <LocationBF />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F5",
  },
  headerImage: {
    width,
    resizeMode: "contain",
    height: height * 0.4,
  },
  content: {
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -40,
    paddingTop: 40,
    backgroundColor: "#F2F4F5",
    flex: 1,
  },
  moreInfoConatiner: {
    backgroundColor: "white",
    borderRadius: 16,
    flex: 1,
    padding: 20,
  },
  imagesPrecaution: {
    resizeMode: "contain",
    width: width * 0.3,
    height: width * 0.3,
  },
  chartContainer: {
    height: height * 0.25,
    width: width * 0.75,
    flexDirection: "row",
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginLeft: width * 0.1,
  },
  chartsScrollViewContainer: {
    height: height * 0.25,
    width: width * 0.75,
    flexDirection: "row",
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
  },
  chartTitle: {
    fontSize: 16,
    color: "gray",
  },
  chartNumbers: {
    fontSize: 27,
    fontWeight: "bold",
    opacity: 0.8,
  },
  flexStartConatier: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  charts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    flex: 1,
  },
  moreInfoText: {
    opacity: 0.7,
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    marginTop: 20,
    flex: 1,
  },
  moreInfoInnerConatiner: {
    flexDirection: "row",
  },
  mapConatiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    paddingBottom: 20,
    marginTop: 20,
    borderRadius: 16,
  },
  mapImage: {
    width: width - 50,
    resizeMode: "contain",
    height: 200,
    borderRadius: 16,
    marginTop: 10,
  },
  pmFundsConatiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#F2F2F2",
    paddingBottom: 20,
    marginTop: 20,
    borderRadius: 16,
  },
  pmFundsImage: {
    width: width - 50,
    resizeMode: "contain",
    height: 300,
    borderRadius: 16,
    marginTop: 10,
  },
  title: {
    textAlign: "left",
    backgroundColor: "white",
    opacity: 1,
    fontSize: 27,
    color: "#1f1f1f",
    paddingLeft: 20,
    marginTop: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  rowText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  loadingConatiner: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingGif: { resizeMode: "contain", height: 300, width: 300 },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    paddingBottom: 20,
  },
  symptomsImage: {
    width: width - 50,
    resizeMode: "contain",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  imageSymptoms: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
  },
  symptomsText: { flex: 1, textAlign: "center" },
  newsConatiner: {
    backgroundColor: "white",
    padding: 20,
    paddingTop: 0,
    borderRadius: 16,
  },
  newsParentContainer: { marginTop: 30, borderRadius: 16 },
  newsPostConatiner: {
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderRadius: 16,
  },
  newsPostTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  newsImage: {
    resizeMode: "cover",
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  newsAuthor: {
    fontSize: 16,
    color: "#1f1f1f",
    fontWeight: "bold",
  },
  sourceName: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    opacity: 0.8,
  },
  descriptionText: {
    fontSize: 14,
    opacity: 0.6,
  },
});
