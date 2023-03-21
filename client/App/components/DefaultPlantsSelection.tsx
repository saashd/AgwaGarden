import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../constants/colors";
import { fetchPlants, fetchCategories } from "../store/actions";
import { RootState } from "../store/reducers";
import { Plant } from "../store/types";

import { CategoryComponent } from "./Category";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGreen,
  },
  text: {
    fontWeight: "bold",
    color: colors.darkGreen,
    fontSize: 20,
    textAlign: "center",
  },
  header: {
    alignItems: "flex-end",
    marginHorizontal: 20,
  },
});

const updateSelection = (plants: Plant[], plantsIds: string[]) => {
  return plants.filter((plant) => {
    return plantsIds.includes(plant.id);
  });
};

const DefaultPlantsSelection = () => {
  const dispatch = useDispatch();
  const [defaultSelectedPlants, setDefaultSelectedPlantsIds] = useState<
    Plant[]
  >([]);
  const defaultSelectedPlantsIds = useSelector(
    (state: RootState) => state.user.data.default_plants_selection
  );
  const allPlants = useSelector((state: RootState) => state.plants.data);
  useEffect(() => {
    fetchCategories(dispatch);
    fetchPlants(dispatch);
    setDefaultSelectedPlantsIds(
      updateSelection(allPlants, defaultSelectedPlantsIds)
    );
  }, []);

  if (defaultSelectedPlants.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.darkGreen} />
      </View>
    );
  }
  return (
    <View>
      <SafeAreaView style={{ flex: 1 }}>
        <CategoryComponent
          name={""}
          plants={defaultSelectedPlants}
          hideAddButton={true}
        />
      </SafeAreaView>
    </View>
  );
};

export default DefaultPlantsSelection;
