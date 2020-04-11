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
      require("./Screens/MagicItinenary/MagicItinenary.gif"),
      require("./assets/login-bg.png"),
      "https://auto.ndtvimg.com/car-images/large/mahindra/bolero/mahindra-bolero.jpg?v=19",
      "https://www.seriouseats.com/2019/02/20190122-souffle-omelet-vicky-wasik-15-1500x1125.jpg",
      "https://previews.123rf.com/images/lenm/lenm1509/lenm150900304/45940061-illustration-of-a-meal-tray-filled-with-healthy-food-for-lunch.jpg",
      "https://etimg.etb2bimg.com/photo/68706833.cms",
      "https://a36c2e13a78ae1256a2f-1dc878dead8ec78a84e429cdf4c9df00.ssl.cf1.rackcdn.com/responsive/980/a36c2e13a78ae1256a2f-1dc878dead8ec78a84e429cdf4c9df00.ssl.cf1.rackcdn.com/u/park-hotel-clarke-quay/gallery-2018/Lobby-Park-Hotel-Clarke-Quay.jpg",
      "https://imgd.aeplcdn.com/1056x594/cw/ec/20623/Toyota-Innova-Crysta-Exterior-134987.jpg?wm=0&q=85",
      "https://www.joc.com/sites/default/files/field_feature_image/KFC_0.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe9Rw2Uih-xkhbU5M0Sx40LAgXT-SxWd2izX_MSAw53WdXL98t&s",
      "https://i.ndtvimg.com/i/2017-12/maruti-suzuki-swift-hybrid_827x510_81513853496.jpg",
      "https://www.pridehotel.com/uploads/hotel_thumbnails/stay_thumbnail_59b14965ce25514995584001207.jpg",
      "https://stimg.cardekho.com/images/carexteriorimages/630x420/Ford/Ecosport/7347/1579861367280/front-left-side-47.jpg",
      "https://image.shutterstock.com/image-photo/hdr-image-subway-sandwich-restaurant-260nw-1025584780.jpg",
      "https://cache.dominos.com/olo/6_9_2/assets/build/market/US/_en/images/promo/2018-side-perfect-combo-handheld.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoxXEY1GaD_iA-17qAqmEJq5OJDegiaj4Gp_ofktA7bd4zbRCq&s",
      "https://media.gettyimages.com/photos/interior-view-of-gorgeous-hotel-picture-id838103468?s=612x612",
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
