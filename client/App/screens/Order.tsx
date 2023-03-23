import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  Animated,
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
import { fadeIn, fadeOut } from "../utils/buttonAnimation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
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
    fontSize: 20,
    color: colors.blue,
  },
  hidden: {
    opacity: 0,
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
  const showButton =
    defaultSelectedPlantsIds.length === 5 && defaultSelectionUpdateStatus;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonHeight = new Animated.Value(0);
  const buttonStyle = {
    transform: [
      {
        translateY: buttonOpacity.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
      {
        scaleY: buttonOpacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
    height: buttonHeight,
    opacity: buttonOpacity,
  };

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
    showButton
      ? fadeIn(buttonOpacity, buttonHeight)
      : fadeOut(buttonOpacity, buttonHeight);
  }, [showButton]);

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
          Something went wrong... {"\n"} Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <DefaultPlantsSelection
          buttonAction={"-"}
          title="Selected Plants"
          defaultSelectedPlantsIds={defaultSelectedPlantsIds}
          onSelectedPlantsChange={setDefaultSelectedPlantsIds}
        />

        <Animated.View style={buttonStyle}>
          <View style={[styles.mainButtonContainer]}>
            <MainButton
              disabled={!showButton}
              title="Save Selection"
              onPress={saveDefaultSelection}
            />
          </View>
        </Animated.View>

        <Text style={styles.title}>You can select 5 plants by choice:</Text>
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
