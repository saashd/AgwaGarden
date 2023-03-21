import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { CategoryComponent } from "../components/Category";
import colors from "../constants/colors";
import { Plant, Category } from "../store/types";
import { RootState } from "../store/reducers";
import DefaultPlantsSelection from "../components/DefaultPlantsSelection";
import MainButton from "../components/MainButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  updateDefaultSelection,
  updateDefaultSelectionStatus,
} from "../store/reducers/userReducer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.lightGreen,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.white,
  },
  mainButtonContainer: {
    alignItems: "center",
  },
  title: {
    marginTop: 15,
    fontSize: 20,
    color: colors.blue,
    fontWeight: "bold",
  },
});

const Order = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.data._id);
  const plants = useSelector((state: RootState) => state.plants);
  const categories = useSelector((state: RootState) => state.categories);
  const [error, setError] = useState(
    useSelector(
      (state: RootState) => state.categories.error || state.plants.error
    )
  );
  const defaultSelectionUpdateStatus = useSelector(
    (state: RootState) => state.user.defaultSelectionUpdateStatus
  );
  const isFetching = useSelector(
    (state: RootState) => state.plants.isFetching || state.categories.isFetching
  );
  const [modifiedCategories, setModifiedCategories] = useState<Category[]>([]);
  const [defaultSelectedPlantsIds, setDefaultSelectedPlantsIds] = useState<
    string[]
  >(
    useSelector((state: RootState) => state.user.data.default_plants_selection)
  );

  const replacePlantsInCategories = useCallback(
    (plants: Plant[], categories: Category[]) => {
      return categories.map((category) => {
        const updatedCategory = { ...category };
        updatedCategory.plants = category.plants.map((plantInCategory) => {
          const plant = plants.find((p: Plant) => p.id === plantInCategory.id);
          return plant || plantInCategory;
        });
        return updatedCategory;
      });
    },
    []
  );
  const saveDefaultSelection = async () => {
    try {
      await axios.put(`/user/${userId}/default`, {
        default_plants_selection: defaultSelectedPlantsIds,
      });
      dispatch(updateDefaultSelection(defaultSelectedPlantsIds));
      dispatch(updateDefaultSelectionStatus(false));
      navigation.navigate("Home", { confirmation: "Changes saved" });
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    if (!isFetching) {
      const updatedData = replacePlantsInCategories(
        plants.data,
        categories.data
      );
      setModifiedCategories(updatedData);
    }
  }, [isFetching, plants.data, categories.data]);

  if (isFetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Something went wrong... {"\n"} Plese try again later.
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <DefaultPlantsSelection
          buttonAction={"-"}
          title="Selected Plants"
          defaultSelectedPlantsIds={defaultSelectedPlantsIds}
          onSelectedPlantsChange={setDefaultSelectedPlantsIds}
        />
        {defaultSelectedPlantsIds.length === 5 &&
          defaultSelectionUpdateStatus && (
            <View style={styles.mainButtonContainer}>
              <MainButton
                disabled={false}
                title="Save Selection"
                onPress={saveDefaultSelection}
              />
            </View>
          )}
        <Text style={styles.title}>You can select 5 plants by choise:</Text>
        {modifiedCategories.map((category) => (
          <CategoryComponent
            buttonAction={"+"}
            key={category.id}
            name={category.name}
            plants={category.plants}
            displayOccurences={false}
            defaultSelectedPlantsIds={defaultSelectedPlantsIds}
            onSelectedPlantsChange={setDefaultSelectedPlantsIds}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;
