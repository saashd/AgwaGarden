import axios from "axios";
import { Platform } from "react-native";
import { store } from "../store";
import { startPollingData } from "../store/actions";

export const getIP = async () => {
  const ip = Platform.OS === "android" ? "10.0.2.2" : "172.20.10.2";
  axios.defaults.baseURL = `http://${ip}:4000/api/`;
  store.dispatch(startPollingData());
};
