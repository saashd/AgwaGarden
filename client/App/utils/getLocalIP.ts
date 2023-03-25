import axios from "axios";
import { Platform } from "react-native";
import { store } from "../store";
import { startPollingData } from "../store/actions";


// TODO: change localhost to your IP address to test on physical device.
export const getIP = async () => {
  const ip = Platform.OS === "android" ? "10.0.2.2" : "localhost";
  axios.defaults.baseURL = `http://${ip}:4000/api/`;
  store.dispatch(startPollingData());
};
