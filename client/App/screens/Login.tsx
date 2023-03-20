import React, { useState } from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../constants/colors";
import { login } from "../store/actions";
import { RootState } from "../store/reducers";
import { Button } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import MainButton from "../components/MainButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGreen,
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
    height: 15,
    margin: 12,
    padding: 10,
  },
  text: {
    textAlign: "center",
  },
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isFetching = useSelector((state: RootState) => state.user.isFetching);

  const handleClick = (e: GestureResponderEvent) => {
    e.preventDefault();
    login(dispatch, { email, password }).then((error) => {
      if (!error) {
        navigation.push("Home");
      } else {
        setIsError(error);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
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
        onPress={(e) => handleClick(e)}
      />
      {isError && <Text style={{ color: "red" }}>Something went wrong...</Text>}
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
