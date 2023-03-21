import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../constants/colors";
import { fetchPlants, fetchCategories } from "../store/actions";
import { RootState } from "../store/reducers";
import { Plant } from "../store/types";
import MainButton from "../components/MainButton";
import DefaultPlantsSelection from "../components/DefaultPlantsSelection";

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
    top: 30,
  },
  header: {
    alignItems: "flex-end",
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

const updateSelection = (plants: Plant[], plantsIds: string[]) => {
  return plants.filter((plant) => {
    return plantsIds.includes(plant.id);
  });
};

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [defaultSelectedPlants, setDefaultSelectedPlantsIds] = useState<
    Plant[]
  >([]);
  const defaultSelectedPlantsIds = useSelector(
    (state: RootState) => state.user.data.default_plants_selection
  );
  const data = useSelector((state: RootState) => state.user.data);
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          Your monthly AgwaFarm {"\n"}
          plants selection:
        </Text>
        <DefaultPlantsSelection />
        <MainButton
          disabled={false}
          title="Update Selection"
          onPress={() => navigation.push("Order")}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
