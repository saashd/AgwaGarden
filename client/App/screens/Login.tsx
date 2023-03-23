import React, { useState } from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  StyleSheet,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../constants/colors";
import { login } from "../store/actions";
import { RootState } from "../store/reducers";
import { StatusBar } from "expo-status-bar";
import MainButton from "../components/MainButton";
import { Fields } from "../store/types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    borderWidth: 0.5,
    borderRadius: 30,
    width: "50%",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    height: 35,
    padding: 10,
  },
  text: {
    textAlign: "center",
  },
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState(undefined);
  const dispatch = useDispatch();
  const isFetching = useSelector((state: RootState) => state.user.isFetching);

  const handleLogIn = (e: GestureResponderEvent) => {
    e.preventDefault();
    login(dispatch, { email, password }).then((err) => {
      if (err) {
        setError(err);
      } else {
        navigation.navigate("Home");
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {isFetching && (
        <ActivityIndicator size="large" color={colors.darkGreen} />
      )}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@email.com"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          autoFocus
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
      <MainButton
        disabled={isFetching}
        title="Login"
        onPress={(e) => handleLogIn(e)}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.text}>Don't have an account? </Text>
        <MainButton
          disabled={false}
          title="Register"
          onPress={() => navigation.push("Register")}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
