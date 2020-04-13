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
import Chatbot from "../Chatbot";

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

    let newsRes = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=in&q=corona&apiKey=1a54f1fa7c7741d28b862ba1a32875ef"
    );
    let news = newsRes.data.articles;
    this.setState({
      news,
      newsLoaded: true,
      loading: false,

      refreshing: false,
    });
  };
  render() {
    const { loading } = this.state;
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
          <Image source={CoronaImage} style={styles.headerImage} />

          <View style={styles.content}>
            <View style={styles.newsParentContainer}>
              <View style={styles.newsConatiner}>
                <Text style={styles.title}>Latest News</Text>
                {this.state.newsLoaded &&
                  this.state.news.map((newsPost, _id) => (
                    <TouchableOpacity
                      key={_id}
                      style={styles.newsPostConatiner}
                      onPress={() => Linking.openURL(newsPost.url)}
                    >
                      <View style={styles.newsPostTitle}>
                        <Image
                          style={styles.newsImage}
                          source={{ uri: newsPost.urlToImage }}
                        />
                        <View style={{ paddingHorizontal: 20 }}>
                          <Text style={styles.newsAuthor}>
                            {newsPost.author}
                          </Text>
                          <Text style={styles.sourceName}>
                            {newsPost.source.name}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.description}>{newsPost.title}</Text>
                      <Text style={styles.descriptionText}>
                        {`${newsPost.description}...click to read more.`}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </View>
        </ScrollView>
        <Chatbot />
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
