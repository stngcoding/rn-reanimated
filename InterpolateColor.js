import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  useDerivedValue,
  interpolateColor,
} from "react-native-reanimated";

const Colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#F8F8F8",
  },
  light: {
    background: "#f8f8f8",
    circle: "#fff",
    text: "#1e1e1e",
  },
};
const SWITCH_TRACK_COLOR = {
  true: "rgba(256,0,256,0.2)",
  false: "rgba(0,0,0,0.1)",
};
export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const progress = useDerivedValue(() => {
    return isEnabled ? withTiming(1) : withTiming(0);
  }, [isEnabled]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  //   const progress = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return {
      backgroundColor,
    };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );
    return {
      backgroundColor,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );
    return {
      color,
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>THEME</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={"violet"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </Animated.View>
    </Animated.View>
  );
}
const SIZE = Dimensions.get("window").width * 0.7;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZE / 2,
    shadowOffset: {
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  text: {
    fontSize: 70,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 14,
    marginBottom: 10,
  },
});
