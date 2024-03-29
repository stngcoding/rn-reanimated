import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { PinchGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
const imgURL =
  "https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80";
const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width, height } = Dimensions.get("window");

export default function App() {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(1);
  const focalY = useSharedValue(1);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      console.log(event);
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: (event, context) => {
      scale.value = withTiming(1);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: focalX.value,
        },
        {
          translateY: focalY.value,
        },
        {
          translateX: -width / 2,
        },
        {
          translateY: -height / 2,
        },
        {
          scale: scale.value,
        },
        //return to previous
        {
          translateX: -focalX.value,
        },
        {
          translateY: -focalY.value,
        },
        {
          translateX: width / 2,
        },
        {
          translateY: height / 2,
        },
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: focalX.value,
        },
        {
          translateY: focalY.value,
        },
      ],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={{ flex: 1 }}>
        <AnimatedImage style={[{ flex: 1 }, rStyle]} source={{ uri: imgURL }} />
        <Animated.View style={[styles.focalPoint, focalPointStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  focalPoint: {
    width: 20,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 10,
    ...StyleSheet.absoluteFillObject,
  },
});
