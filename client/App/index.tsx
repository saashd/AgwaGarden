import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Navigation from "./config/Navigation";
import axios from "axios";
import { Platform } from "react-native";

const localhost = Platform.OS === "android" ? "10.0.2.2" : "localhost";
axios.defaults.baseURL = `http://${localhost}:4000/api/`;

export default () => {
  return (
    <Provider store={store} >
      <Navigation />
    </Provider>
  );
};
