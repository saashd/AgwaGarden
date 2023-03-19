import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../constants/colors";
import { fetchPlants, fetchCategories } from "../store/actions";
import { RootState } from "../store/reducers";
import { Plant } from "../store/types";
import { Button } from "@rneui/themed";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGreen,
  },
});

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const plants: Plant[] = useSelector((state: RootState) => state.plants.data);
  const isFetching = useSelector((state: RootState) => state.plants.isFetching);
  useEffect(() => {
    fetchCategories(dispatch);
    fetchPlants(dispatch);
  }, []);
  if (isFetching || !plants.length) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Button
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "rgba(90, 154, 230, 1)",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        title="Update Selection"
        onPress={() => navigation.push("Order")}
      />
    </SafeAreaView>
  );
};

export default Home;
