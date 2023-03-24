import { Animated } from "react-native";

export const fadeIn = (buttonOpacity: Animated.Value | Animated.ValueXY) => {
  Animated.timing(buttonOpacity, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false,
  }).start(() => {});
};

export const fadeOut = (buttonOpacity: Animated.Value) => {
  Animated.timing(buttonOpacity, {
    toValue: 0,
    duration: 500,
    useNativeDriver: false,
  }).start(() => {});
};
