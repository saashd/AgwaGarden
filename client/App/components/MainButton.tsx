import React from "react";
import { Button } from "@rneui/themed";
import { GestureResponderEvent } from "react-native";
import colors from "../constants/colors";

interface ButtonProps {
  onPress: (e: GestureResponderEvent) => void;
  title: string;
  disabled: boolean;
}

const MainButton = ({ onPress, title, disabled }: ButtonProps) => {
  return (
    <Button
      disabled={disabled}
      titleStyle={{ fontWeight: "700" }}
      buttonStyle={{
        backgroundColor: colors.darkGreen,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 30,
        height: 40,
      }}
      containerStyle={{
        width: 200,
        marginVertical: 10,
      }}
      title={title}
      onPress={onPress}
    />
  );
};

export default MainButton;
