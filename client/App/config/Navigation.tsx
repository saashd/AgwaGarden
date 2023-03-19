import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Order from "../screens/Order";

const Stack = createStackNavigator();

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator initialRouteName="Home">
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <MainStack.Screen name="Order" component={Order} />
  </MainStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <MainStackScreen />
  </NavigationContainer>
);
