import React from "react";
import { Button } from "@rneui/themed";
import { GestureResponderEvent } from "react-native";

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
        backgroundColor: "rgba(90, 154, 230, 1)",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 30,
      }}
      containerStyle={{
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
      }}
      title={title}
      onPress={onPress}
    />
  );
};

export default MainButton;
