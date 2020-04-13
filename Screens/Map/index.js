import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button, Card, Modal, Text } from "@ui-kitten/components";
import { WebView } from "react-native-webview";
import chat from "../../assets/chat.png";
import { Icon } from "@ui-kitten/components";

const { width, height } = Dimensions.get("window");

export default class index extends Component {
  state = {
    overlay: true,
  };

  render() {
    return (
      <WebView
        domStorageEnabled={false}
        injectedJavaScript={`
       document.querySelector(".information").remove();
        document.querySelector(".header").remove();
        document.querySelector(".floatingUpsell").remove()
        document.querySelector(".map").style.height = "calc(100% + 100px)";
        `}
        onLoadStart={() => {
          this.setState({ overlay: true });
        }}
        source={{
          uri: "https://bing.com/covid/local/india",
        }}
        style={{ width, height: height * 0.4 }}
      />
    );
  }
}
