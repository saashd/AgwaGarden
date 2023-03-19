import React, { useState, useEffect } from "react";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.lightGreen,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.darkGreen,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

const Order = () => {
  const plants = useSelector((state: RootState) => state.plants);

  const categories = useSelector((state: RootState) => state.categories);
  const [modifiedCategories, setModifiedCategories] = useState<Category[]>([]);

  const replacePlantsInCategories = (
    plants: Plant[],
    categories: Category[]
  ) => {
    return categories.map((category) => {
      const updatedCategory = { ...category };
      updatedCategory.plants = category.plants.map((plantInCategory) => {
        const plant = plants.find((p: Plant) => p.id === plantInCategory.id);
        return plant || plantInCategory;
      });
      return updatedCategory;
    });
  };
  useEffect(() => {
    if (!categories.isFetching && !plants.isFetching) {
      const updatedData = replacePlantsInCategories(
        plants.data,
        categories.data
      );
      setModifiedCategories(updatedData);
    }
  }, []);

  if (categories.isFetching || plants.isFetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (categories.error || plants.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Something went wrong...</Text>
        <Text style={styles.text}> Plese try again later.</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {modifiedCategories.map((category) => (
          <CategoryComponent
            key={category.id}
            name={category.name}
            plants={category.plants}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;
