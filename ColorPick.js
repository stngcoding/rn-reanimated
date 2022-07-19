import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import ColorPicker from "./components/ColorPicker";

const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];

const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";
const { width } = Dimensions.get("window");
const PICKER_WIDTH = width * 0.9;
const CIRCLE_SIZE = width * 0.8;

export default function App() {
  const pickedColor = useSharedValue(COLORS[0]);
  const onColorChanged = useCallback((color) => {
    "worklet";
    pickedColor.value = color;
  }, []);
  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });
  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gardient}
          maxWidth={PICKER_WIDTH}
          onColorChanged={onColorChanged}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  gardient: { height: 40, width: PICKER_WIDTH, borderRadius: 20 },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
});
