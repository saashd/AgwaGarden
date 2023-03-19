import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";
import Navigation from "./config/Navigation";
import Home from "./screens/Home";

export default () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
