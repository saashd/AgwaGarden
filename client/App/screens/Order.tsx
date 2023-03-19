import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, SafeAreaView, View } from "react-native";
import { CategoryComponent } from "../components/Category";
import colors from "../constants/colors";
import { Plant, Category } from "../types";

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
});

const Order = () => {
  const [plantsData, setPlantsData] = useState<Array<Plant>>([]);
  const [categoriesData, setCategoriesData] = useState<Array<Category>>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    Promise.all([
      fetch(
        "https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/data/catalogs/plants.json"
      ).then((response) => response.json()),
      fetch(
        "https://dev-agwa-public-static-assets-web.s3-us-west-2.amazonaws.com/data/catalogs/agwafarm.json"
      ).then((response) => response.json()),
    ])
      .then(([plants, categories]) => {
        const modifiedCategories = replacePlantsInCategories(
          plants.plants,
          categories.categories
        );
        setPlantsData(plants.plants);
        setCategoriesData(modifiedCategories);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Order Screen</Text>
        {categoriesData.map((category) => (
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
