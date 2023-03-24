import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import colors from "../constants/colors";
import { Action, MAX_NUM_OF_SELECTED_PLANTS } from "../constants/consts";
import { Plant } from "../store/types";
import { PlantComponent } from "./Plant";
import ArrowButton from "./ArrowButton";
import ActionButton from "./ActionButton";
import { updateDefaultSelectionStatus } from "../store/reducers/userReducer";
const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    paddingBottom: 10,
    fontSize: 16,
    color: colors.blue,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

interface CategoryProps {
  name: string;
  plants: Plant[];
  buttonAction: Action;
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
  const flatListRef = useRef<FlatList<Plant> | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const ITEM_WIDTH = screen.width * 0.2;

  const handleActionButton = (action: string, plantId: string) => {
    let updatedSelection: Array<string> = [];
    if (action == Action.ADD) {
      onSelectedPlantsChange([...defaultSelectedPlantsIds, plantId]);
    } else if (action == Action.REMOVE) {
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
    return defaultSelectedPlantsIds.filter((id) => id === plantId).length;
  };

  const handleScrollLeft = () => {
    const newOffset = Math.max(0, scrollOffset - ITEM_WIDTH);
    flatListRef.current?.scrollToOffset({ offset: newOffset, animated: true });
    setScrollOffset(newOffset);
  };

  const handleScrollRight = () => {
    const newOffset = Math.min(
      (plants.length - 1) * ITEM_WIDTH,
      scrollOffset + ITEM_WIDTH
    );
    flatListRef.current?.scrollToOffset({ offset: newOffset, animated: true });
    setScrollOffset(newOffset);
  };
  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.container}>
        <ArrowButton onPress={handleScrollLeft} direction={"left"} />
        <FlatList
          data={plants}
          ref={flatListRef}
          renderItem={({ item }) => (
            <View key={item.id}>
              {(buttonAction == Action.REMOVE ||
                (defaultSelectedPlantsIds.length < MAX_NUM_OF_SELECTED_PLANTS &&
                  buttonAction == Action.ADD)) && (
                <ActionButton
                  action={buttonAction}
                  onPress={() => handleActionButton(buttonAction, item.id)}
                  buttonDirection={"left"}
                  disabled={
                    defaultSelectedPlantsIds.length >=
                      MAX_NUM_OF_SELECTED_PLANTS && buttonAction == Action.ADD
                  }
                />
              )}
              <PlantComponent plant={item} />
              {displayOccurences && (
                <ActionButton
                  action={countOccurences(item.id).toString()}
                  onPress={() => null}
                  buttonDirection={"right"}
                  disabled={true}
                />
              )}
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <ArrowButton onPress={handleScrollRight} direction={"right"} />
      </View>
    </View>
  );
};
