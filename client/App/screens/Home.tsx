import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import colors from "../constants/colors";
import { fetchPlants, fetchCategories } from "../store/actions";
import { RootState } from "../store/reducers";
import { Plant, User } from "../store/types";
import { logout } from "../store/reducers/userReducer";
import MainButton from "../components/MainButton";

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
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
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
    return;
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.darkGray} />
    </View>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MainButton
          disabled={false}
          title="Update Selection"
          onPress={() => navigation.push("Order")}
        />
      </View>
    </View>
  );
};

export default Home;
