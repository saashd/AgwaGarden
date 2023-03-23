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
import { register } from "../store/actions";
import { RootState } from "../store/reducers";
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
    fontWeight: "100",
    paddingBottom: 2,
  },
});

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const isFetching = useSelector((state: RootState) => state.user.isFetching);

  const handleLogIn = (e: GestureResponderEvent) => {
    e.preventDefault();
    //TODO: add email validation

    const fields = {
      "first name": firstName,
      "last name": lastName,
      email,
      password,
      "password confirmation": confirmPassword,
    };
    let unsetField = false;
    for (const key in fields) {
      if (fields[key as keyof Fields] === "") {
        setError(`Please input ${key}`);
        unsetField = true;
        break;
      }
    }
    if (unsetField) {
      return;
    }
    if (password === confirmPassword && password !== "") {
      register(dispatch, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }).then((err) => {
        if (err) {
          setError(err);
        } else {
          navigation.navigate("Home");
        }
      });
    } else {
      setError("Passwords dont match");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isFetching && (
        <ActivityIndicator size="large" color={colors.darkGreen} />
      )}
      <Text style={styles.text}>First Name</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Israel"
          autoCapitalize="none"
        />
      </View>
      <Text style={styles.text}>Last Name</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Israeli"
          autoCapitalize="none"
        />
      </View>
      <Text style={styles.text}>Email</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@email.com"
          autoCapitalize="none"
        />
      </View>
      <Text style={styles.text}>Password</Text>
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
      <Text style={styles.text}>Confirm Password</Text>
      <View style={styles.inputView}>
        <TextInput
          autoFocus
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="********"
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
      <MainButton
        disabled={isFetching}
        title="Register"
        onPress={(e) => handleLogIn(e)}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </SafeAreaView>
  );
};

export default Register;
