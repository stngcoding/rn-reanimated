import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  useAnimatedGestureHandler,
  withDecay,
  useDerivedValue,
  cancelAnimation,
} from "react-native-reanimated";
import Page2, { PAGE_WIDTH } from "./components/Page2";

const titles = ["What's", "up", "mobile", "devs?"];

const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);
export default function App() {
  const translateX = useSharedValue(0);
  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: (event, context) => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{ flex: 1, flexDirection: "row" }}>
          {titles.map((title, index) => {
            return (
              <Page2
                translateX={clampedTranslateX}
                key={index.toString()}
                index={index}
                title={title}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
