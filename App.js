import React, { Component, Suspense } from "react";
import { View, StatusBar, Image } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider } from "react-redux";
import store from "./store";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import * as firebase from "firebase/app";
import "firebase/auth";

import { AppNavigator } from "./navigation";
import { ErrorBoundary } from "./components";

console.disableYellowBox = true;

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const fallBackComponent = () => {
  return (
    <View style={styles.containerFlex}>
      <AppLoading size="large" />
    </View>
  );
};

class App extends Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    try {
      firebase.initializeApp({
        apiKey: "AIzaSyAJ8ovAPywQFoiiHaDl16-_1pEQgDgOTE8",
        authDomain: "covidtracker-a742b.firebaseapp.com",
        databaseURL: "https://covidtracker-a742b.firebaseio.com",
        projectId: "covidtracker-a742b",
        storageBucket: "covidtracker-a742b.appspot.com",
        messagingSenderId: "898486610796",
        appId: "1:898486610796:web:1977d0cfd795e9571be149",
        measurementId: "G-F88ESL18TZ",
      });
    } catch (e) {
      console.log(e);
    }
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("./assets/01.png"),
      require("./assets/02.png"),
      require("./assets/03.png"),
      require("./assets/04.png"),
      require("./assets/05.png"),
      require("./assets/06.png"),
      require("./assets/symptoms.png"),
      require("./assets/breathelessness.gif"),
      require("./assets/home.jpg"),
      require("./assets/map.png"),
      require("./assets/pmdonate.png"),
      require("./assets/app_intro_1.png"),
      require("./assets/app_intro_2.png"),
      require("./assets/app_intro_3.png"),
      require("./assets/app_intro_4.png"),
      require("./assets/app_intro_5.png"),
      require("./assets/app_intro_6.png"),
      require("./assets/experiences.jpg"),
      require("./assets/home.jpg"),
      require("./assets/restaurant.jpg"),
      require("./assets/airport-maps/map.png"),
      require("./assets/AI.jpg"),
      require("./Screens/LiquidSwipe/assets/bravo.gif"),
      require("./Screens/LiquidSwipe/assets/firstPageImage.png"),
      require("./assets/login-bg.png"),
    ]);
    await Font.loadAsync({
      Arial: require("./assets/fonts/Arial.ttf"),
      monti: require("./assets/fonts/Montserrat-ExtraLight.otf"),
    });
    await Promise.all([...imageAssets]);
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <Provider store={store}>
        <Suspense fallback={fallBackComponent}>
          <ErrorBoundary>
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
              <IconRegistry icons={EvaIconsPack} />
              <StatusBar
                translucent
                backgroundColor="#fff"
                barStyle="dark-content"
              />
              <AppNavigator />
            </ApplicationProvider>
          </ErrorBoundary>
        </Suspense>
      </Provider>
    );
  }
}

export default App;
