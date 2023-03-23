import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  arrow: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  arrowIcon: {
    color: colors.blue,
  },
});

interface ArrowButtonProps {
  onPress: () => void;
  direction: "left" | "right";
}

const ArrowButton = ({ onPress, direction }: ArrowButtonProps) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.arrow}
        onPress={onPress}

      >
        <AntDesign name={direction} size={20} style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default ArrowButton;
