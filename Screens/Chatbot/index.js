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
    chat: false,
  };
  assistant = () => {
    this.setState((prevState, props) => ({ chat: !prevState.chat }));
  };

  render() {
    return (
      <>
        <Modal
          onBackdropPress={() =>
            this.setState((prevState, props) => ({ chat: !prevState.chat }))
          }
          style={{
            height: 0.8 * height,
            width: 0.8 * width,
          }}
          backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          visible={this.state.chat}
        >
          <KeyboardAvoidingView
            style={{
              flex: 1,
            }}
            behavior="height"
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <WebView
                domStorageEnabled={false}
                cacheEnabled={false}
                cacheMode="LOAD_NO_CACHE"
                source={{
                  uri:
                    "https://fightcorona.allincall.in/chat/index/?id=370&name=uat",
                }}
                style={{ flex: 1 }}
              />
            </View>
          </KeyboardAvoidingView>
        </Modal>

        <TouchableOpacity
          onPress={() => this.assistant()}
          style={{
            position: "absolute",
            right: 15,
            bottom: 15,
            height: 70,
            width: 70,
            zIndex: 5,
            backgroundColor: "#f9f9f9",
            padding: 10,
            borderRadius: 50,
            shadowColor: "black",
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 10,
            elevation: 3,
            backgroundColor: "#fff",
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              flex: 1,
              height: null,
              width: null,
            }}
            source={chat}
          />
        </TouchableOpacity>
      </>
    );
  }
}
