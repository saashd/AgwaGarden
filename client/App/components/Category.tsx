import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import colors from "../constants/colors";
import { Plant } from "../store/types";
import { PlantComponent } from "./Plant";
import ArrowButton from "./ArrowButton";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    fontSize: 18,
    color: colors.blue,
    fontWeight: "bold",
  },
  container: {
    marginHorizontal: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  scrollViewContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});

interface CategoryProps {
  name: string;
  plants: Plant[];
}

export const CategoryComponent: React.FC<CategoryProps> = ({
  name,
  plants,
}) => {
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [currentXOffset, setCurrentXOffset] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const numOfPlants = plants.length;
  const scrollViewRef = useRef<ScrollView>(null);

  const _handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newXOffset = event.nativeEvent.contentOffset.x;
    setCurrentXOffset(newXOffset);
  };

  const handleLeftArrow = () => {
    const eachItemOffset = scrollViewWidth / numOfPlants;
    const _currentXOffset = currentXOffset - eachItemOffset;
    scrollViewRef.current?.scrollTo({
      x: _currentXOffset,
      y: 0,
      animated: true,
    });
  };

  const handleRightArrow = () => {
    const eachItemOffset = scrollViewWidth / numOfPlants;
    const _currentXOffset = currentXOffset + eachItemOffset;
    scrollViewRef.current?.scrollTo({
      x: _currentXOffset,
      y: 0,
      animated: true,
    });
  };

  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.container}>
        {currentXOffset > 0 && (
          <ArrowButton
            onPress={handleLeftArrow}
            disabled={currentXOffset <= 0}
            direction={"left"}
          />
        )}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContainer}
          onLayout={(event) => setLayoutWidth(event.nativeEvent.layout.width)}
          onContentSizeChange={(width) =>
            setScrollViewWidth(width - layoutWidth)
          }
          onScroll={_handleScroll}
          scrollEventThrottle={50}
        >
          {plants.map((plant) => (
            <PlantComponent key={plant.id} plant={plant} />
          ))}
        </ScrollView>
        {currentXOffset + layoutWidth < scrollViewWidth && (
          <ArrowButton
            onPress={handleRightArrow}
            disabled={currentXOffset + layoutWidth >= scrollViewWidth}
            direction={"right"}
          />
        )}
      </View>
    </View>
  );
};
