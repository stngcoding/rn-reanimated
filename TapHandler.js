import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  TapGestureHandler,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from "react-native-reanimated";

export default function App() {
  const singleTap = Gesture.Tap().onEnd((_event, success) => {
    if (success) {
      console.log("single tap!");
    }
  });
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        console.log("double tap!");
      }
    });

  const taps = Gesture.Exclusive(doubleTap, singleTap);
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={taps}>
        <Animated.View>
          <ImageBackground
            source={require("./assets/image.jpg")}
            style={styles.image}
          >
            <Image
              source={require("./assets/heart.png")}
              style={[
                styles.image,
                {
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.35,
                  shadowRadius: 35,
                },
              ]}
              resizeMode={"center"}
            />
          </ImageBackground>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const { width: SIZE } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
});
