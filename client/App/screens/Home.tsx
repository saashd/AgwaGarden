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
import { Button } from "@rneui/themed";
import { logout } from "../store/reducers/userReducer";

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
  const user: User = useSelector((state: RootState) => state.user.data);
  useEffect(() => {
    fetchCategories(dispatch);
    fetchPlants(dispatch);
  }, []);
  if (isFetching || !plants.length) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.lightGreen} />
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Entypo name="log-out" size={26} color={colors.darkGreen} />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.content}>
        <Text style={styles.text}>
          Hey, {user.first_name}!{"\n"}
          Welcome Back{" "}
        </Text>
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
      </View>
    </View>
  );
};

export default Home;
