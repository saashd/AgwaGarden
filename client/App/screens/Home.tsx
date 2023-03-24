import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@react-native-material/core";
import colors from "../constants/colors";
import { fetchPlants, fetchCategories } from "../store/actions";
import { RootState } from "../store/reducers";
import MainButton from "../components/MainButton";
import DefaultPlantsSelection from "../components/DefaultPlantsSelection";
import { updateDefaultSelectionStatus } from "../store/reducers/userReducer";
import { Action } from "../constants/consts";
const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    color: colors.darkGreen,
    fontSize: 20,
    textAlign: "center",
    padding: 20,
  },
  content: {
    flex: 1,
    marginTop: 150,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmationText: {
    color: colors.darkGreen,
    fontSize: 16,
    textAlign: "center",
  },
  confirmationContainer: {
    backgroundColor: colors.darkGreen,
    position: "absolute",
    start: 16,
    end: 16,
    borderRadius: 10,
  },
  image: {
    width: screen.width * 0.15,
    height: screen.width * 0.15,
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
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchCategories(dispatch),
        fetchPlants(dispatch),
      ]).then((errors) => {
        for (const error of errors) {
          if (error) {
            setError(error);
          }
        }
      });
      defaultSelectedPlantsIds && setLoading(false);
    };
    fetchData();
    dispatch(updateDefaultSelectionStatus(false));
  }, [dispatch, error]);
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
      {displayConfirmation && (
        <Snackbar message={confirmation} style={styles.confirmationContainer} />
      )}

      <View style={styles.content}>
        <Image style={styles.image} source={require("../../assets/logo.png")} />
        <Text style={styles.text}>
          Your monthly AgwaFarm {"\n"}
          plants selection:
        </Text>
        <DefaultPlantsSelection
          buttonAction={Action.NO_ACTION}
          title=""
          defaultSelectedPlantsIds={defaultSelectedPlantsIds}
          onSelectedPlantsChange={() => null}
        />
        <View style={{ bottom: "40%" }}>
          <MainButton
            disabled={false}
            title="Update Selection"
            onPress={() => navigation.push("Order")}
          />
        </View>
        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </View>
    </ScrollView>
  );
};

export default Home;
