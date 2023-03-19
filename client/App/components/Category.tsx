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

  arrow: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  arrowIcon: {
    color: colors.blue,
  },
  scrollViewContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
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
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => handleLeftArrow()}
            disabled={currentXOffset <= 0}
          >
            <AntDesign name="left" size={16} style={styles.arrowIcon} />
          </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => handleRightArrow()}
            disabled={currentXOffset + layoutWidth >= scrollViewWidth}
          >
            <AntDesign name="right" size={16} style={styles.arrowIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
