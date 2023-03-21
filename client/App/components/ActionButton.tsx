import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    zIndex: 1,
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

interface ActionButtonProps {
  onPress: () => void;
  action: string;
  buttonDirection: "left" | "right";
  disabled: boolean;
}

const ActionButton = ({
  action,
  onPress,
  buttonDirection,
  disabled,
}: ActionButtonProps) => {
  return (
    <View
      style={[
        styles.buttonContainer,
        buttonDirection === "left" ? { left: 5 } : { right: 5 },
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{action}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;
