import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Order from "../screens/Order";
import Login from "../screens/Login";
import Register from "../screens/Registration";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { User } from "../store/types";

const MainStack = createStackNavigator();
const MainStackScreen = () => {
  const user: User = useSelector((state: RootState) => state.user.data);
  return (
    <MainStack.Navigator>
      {user.email ? (
        <>
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <MainStack.Screen name="Order" component={Order} />
        </>
      ) : (
        <>
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
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
