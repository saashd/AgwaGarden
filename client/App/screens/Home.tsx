import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@react-native-material/core";
import colors from "../constants/colors";
import { fetchPlants, fetchCategories } from "../store/actions";
import { RootState } from "../store/reducers";
import MainButton from "../components/MainButton";
import DefaultPlantsSelection from "../components/DefaultPlantsSelection";
import { updateDefaultSelectionStatus } from "../store/reducers/userReducer";
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
  confirmationText: {
    color: colors.darkGreen,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});

const Home = ({ route, navigation }) => {
  const confirmation = route.params?.confirmation;
  const dispatch = useDispatch();
  const defaultSelectedPlantsIds = useSelector(
    (state: RootState) => state.user.data.default_plants_selection
  );
  const [loading, setLoading] = useState(true);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCategories(dispatch), fetchPlants(dispatch)]);
      setLoading(false);
    };
    fetchData();
    dispatch(updateDefaultSelectionStatus(false));
  }, [dispatch]);
  useEffect(() => {
    if (confirmation) {
      setDisplayConfirmation(true);
      setTimeout(() => {
        setDisplayConfirmation(false);
      }, 2000);
    }
  }, [confirmation]);
  if (loading) {
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
        <DefaultPlantsSelection
          buttonAction={null}
          title=""
          defaultSelectedPlantsIds={defaultSelectedPlantsIds}
          onSelectedPlantsChange={() => null}
        />
        <MainButton
          disabled={false}
          title="Update Selection"
          onPress={() => navigation.push("Order")}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 50,
        }}
      >
        {displayConfirmation && (
          <Snackbar
            message={confirmation}
            style={{
              backgroundColor: colors.darkGreen,
              position: "absolute",
              start: 16,
              end: 16,
              flex: 1,
              padding: 10,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
