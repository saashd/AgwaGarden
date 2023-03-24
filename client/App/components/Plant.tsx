import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

import colors from "../constants/colors";
import { Plant } from "../store/types";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  plantImage: {
    borderRadius: screen.width * 0.075,
    width: screen.width * 0.15,
    height: screen.width * 0.15,
    backgroundColor: colors.white,
  },
  plantName: {
    fontSize: 12,
    fontWeight: "200",
    width: screen.width * 0.15,
    textAlign: "center",
    flexWrap: "wrap",
    marginTop: 5,
  },
  plantContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    flexDirection: "column",
    paddingHorizontal: 10,
  },
});

interface PlantProps {
  plant: Plant;
}

export const PlantComponent: React.FC<PlantProps> = ({ plant }) => {
  return (
    <View style={styles.plantContainer}>
      <Image
        style={styles.plantImage}
        source={{
          uri: `https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/images/vegetables/${plant.imageId}@3x.jpg`,
        }}
      />
      <Text style={styles.plantName}>{plant.name}</Text>
    </View>
  );
};
