import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Order from "../screens/Order";
import Login from "../screens/Login";
import Register from "../screens/Registration";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { User } from "../store/types";
import { TouchableOpacity, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";
import { logout } from "../store/reducers/userReducer";

const MainStack = createStackNavigator();
const MainStackScreen = () => {
  const user: User = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.lightGreen,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: colors.darkGreen,
        },
        headerTintColor: colors.darkGreen,
      }}
    >
      {user.email !== null ? (
        <>
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{
              title: `Welcome ${user.first_name}!`,
              headerRight: () => (
                <TouchableOpacity onPress={() => dispatch(logout())}>
                  <Entypo name="log-out" size={22} color={colors.darkGreen} />
                </TouchableOpacity>
              ),
              headerLeft: () => null,
            }}
          />
          <MainStack.Screen
            name="Order"
            component={Order}
            options={({ navigation }) => ({
              title: "Select Plants",
              headerRight: () => (
                <TouchableOpacity onPress={() => dispatch(logout())}>
                  <Entypo name="log-out" size={22} color={colors.darkGreen} />
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.push("Home")}
                >
                  <Entypo
                    name="chevron-left"
                    size={26}
                    color={colors.darkGreen}
                  />
                  <Text style={{ color: colors.darkGreen, fontWeight: "bold" }}>
                    Home
                  </Text>
                </TouchableOpacity>
              ),
            })}
          />
        </>
      ) : (
        <>
          <MainStack.Screen name="Login" component={Login} />
          <MainStack.Screen name="Register" component={Register} />
        </>
      )}
    </MainStack.Navigator>
  );
};

export default () => (
  <NavigationContainer>
    <MainStackScreen />
  </NavigationContainer>
);
