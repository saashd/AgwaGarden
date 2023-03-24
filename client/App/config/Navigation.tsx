import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Order from "../screens/Order";
import Login from "../screens/Login";
import Register from "../screens/Registration";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";
import { logout } from "../store/reducers/userReducer";

const MainStack = createStackNavigator();
const MainStackScreen = () => {
  const user = useSelector((state: RootState) => state.user.data);
  return (
    <MainStack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.lightGreen,
        },
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
      {user._id !== null ? (
        <>
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{
              title: `Welcome ${user.first_name}!`,
              headerRight: () => LogOut(),
              headerLeft: () => null,
            }}
          />
          <MainStack.Screen
            name="Order"
            component={Order}
            options={{
              title: "Select Plants",
              headerRight: () => LogOut(),
              headerBackTitle: "Home",
              headerBackTitleStyle: {
                color: colors.darkGreen,
              },
            }}
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

const LogOut = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => dispatch(logout())}
      style={{ marginRight: 10 }}
    >
      <Entypo name="log-out" size={22} color={colors.darkGreen} />
    </TouchableOpacity>
  );
};

export default () => (
  <NavigationContainer>
    <MainStackScreen />
  </NavigationContainer>
);
