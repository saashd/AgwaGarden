import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";
import Navigation from "./config/Navigation";
import axios from "axios";

axios.defaults.baseURL = `http://localhost:5000/api/`;

export default () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
