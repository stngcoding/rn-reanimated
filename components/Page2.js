import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const { width: PAGE_WIDTH } = Dimensions.get("window");

const Page2 = ({ index, title, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value + pageOffset,
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
          alignItems: "center",
          justifyContent: "center",
        },
        rStyle,
      ]}
    >
      <Text
        style={{
          fontSize: 70,
          fontWeight: "700",
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Text>
    </Animated.View>
  );
};
export { PAGE_WIDTH };
export default Page2;

const styles = StyleSheet.create({});
