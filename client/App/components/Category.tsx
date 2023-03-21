import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import colors from "../constants/colors";
import { Plant } from "../store/types";
import { PlantComponent } from "./Plant";
import ArrowButton from "./ArrowButton";
import ActionButton from "./ActionButton";
import { updateDefaultSelectionStatus } from "../store/reducers/userReducer";

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
  buttonAction: "+" | "-" | null;
  displayOccurences: boolean;
  defaultSelectedPlantsIds: Array<string>;
  onSelectedPlantsChange: (selectedPlantsIds: Array<string>) => void;
}

export const CategoryComponent: React.FC<CategoryProps> = ({
  name,
  plants,
  buttonAction,
  displayOccurences,
  defaultSelectedPlantsIds,
  onSelectedPlantsChange,
}) => {
  const dispatch = useDispatch();
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [currentXOffset, setCurrentXOffset] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);
  // const defaultSelectedPlantsIds = useSelector(
  // (state: RootState) => state.user.data.default_plants_selection
  // );
  const scrollViewRef = useRef<ScrollView>(null);
  const numOfPlants = plants.length;

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

  const handleActionButton = (action: string, plantId: string) => {
    let updatedSelection: Array<string> = [];
    if (action == "+") {
      onSelectedPlantsChange([...defaultSelectedPlantsIds, plantId]);
    } else {
      updatedSelection = [...defaultSelectedPlantsIds];
      const index = updatedSelection.indexOf(plantId);
      if (index > -1) {
        updatedSelection.splice(index, 1);
      }
      onSelectedPlantsChange(updatedSelection);
    }
    dispatch(updateDefaultSelectionStatus(true));
  };

  const countOccurences = (plantId: string) => {
    const count = defaultSelectedPlantsIds.reduce((acc, curr) => {
      if (curr === plantId) {
        acc++;
      }
      return acc;
    }, 0);
    return count;
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
            <View key={plant.id}>
              {buttonAction != null && (
                <ActionButton
                  action={buttonAction}
                  onPress={() => handleActionButton(buttonAction, plant.id)}
                  buttonDirection={"left"}
                  disabled={
                    defaultSelectedPlantsIds.length >= 5 && buttonAction == "+"
                  }
                />
              )}
              <PlantComponent plant={plant} />
              {displayOccurences && (
                <ActionButton
                  action={countOccurences(plant.id).toString()}
                  onPress={() => null}
                  buttonDirection={"right"}
                  disabled={true}
                />
              )}
            </View>
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
