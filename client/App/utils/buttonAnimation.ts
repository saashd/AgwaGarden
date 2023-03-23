import { Animated } from "react-native";

export const fadeIn = (
  buttonOpacity: Animated.Value | Animated.ValueXY,
  buttonHeight: Animated.Value | Animated.ValueXY
) => {
  Animated.parallel([
    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }),
    Animated.timing(buttonHeight, {
      toValue: 60,
      duration: 500,
      useNativeDriver: false,
    }),
  ]).start(() => {});
};

export const fadeOut = (
  buttonOpacity: Animated.Value,
  buttonHeight: Animated.Value
) => {
  Animated.sequence([
    Animated.delay(500),
    Animated.parallel([
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(buttonHeight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]),
  ]).start(({ finished }) => {
    if (finished) {
      buttonOpacity.setValue(0);
      buttonHeight.setValue(0);
    }
  });
};
