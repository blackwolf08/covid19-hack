import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent, snapPoint } from "react-native-redash";
import Weave from "./Weave";
import { followPointer, snapProgress } from "./AnimationHelpers";
import {
  initialSideWidth,
  initialWaveCenter,
  sideWidth,
  waveHorRadius,
  waveHorRadiusBack,
  waveVertRadius,
} from "./WeaveHelpers";
import ContentBack from "./ContentBack";
import ContentFront from "./ContentFront";
import Button from "./Button";

export const assets = [
  require("../../assets/cough.gif"),
  require("../../assets/app_intro_5.png"),
];

const { width } = Dimensions.get("window");
const { Value, cond, multiply, divide, interpolate } = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const index = (props) => {
  const y = new Value(initialWaveCenter);
  let [isModalActive, setModalActive] = React.useState(false);
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    y,
    state,
  });
  const maxDist = width - initialSideWidth;
  const isBack = new Value(0);
  const gestureProgress = cond(
    isBack,
    interpolate(translationX, {
      inputRange: [0, maxDist],
      outputRange: [1, 0],
    }),
    interpolate(translationX, {
      inputRange: [-maxDist, 0],
      outputRange: [0.4, 0],
    })
  );
  const progress = snapProgress(
    gestureProgress,
    state,
    isBack,
    snapPoint(
      gestureProgress,
      divide(
        multiply(-1, velocityX),
        cond(isBack, maxDist, multiply(maxDist, 0.4))
      ),
      [0, 1]
    )
  );
  const centerY = followPointer(y);
  const horRadius = cond(
    isBack,
    waveHorRadiusBack(progress),
    waveHorRadius(progress)
  );
  const vertRadius = waveVertRadius(progress);
  const sWidth = sideWidth(progress);
  return (
    <View style={styles.container}>
      <ContentBack
        backgroundColor="white"
        source={assets[0]}
        title1="NEWS"
        title2="SYMPTOMS"
        title3="STATS"
        color="black"
      />
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Weave sideWidth={sWidth} {...{ centerY, horRadius, vertRadius }}>
            <ContentFront
              backgroundColor="#7E89FD"
              source={assets[1]}
              title1="Test Yourself For"
              title2="COVID-19"
              color="#fff"
            />
          </Weave>
          <Button y={centerY} {...{ progress }} />
        </Animated.View>
      </PanGestureHandler>
      <LinearGradient colors={["#FFBF00", "#FFDC73"]}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("App");
            console.log(props);
          }}
        >
          <Text
            style={{
              paddingVertical:
                Platform.OS == "android" ? Constants.statusBarHeight + 10 : 40,
              fontSize: 20,
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <Text
          style={{
            position: 'absolute',
            left: 30,
            bottom: 10,
            padding: 20,
            borderRadius: 50,
            backgroundColor: 'white',
            color: 'black'
          }}
        >
          Back
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default index;
