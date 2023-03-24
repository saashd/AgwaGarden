import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Navigation from "./config/Navigation";
import { getIP } from "./utils/getLocalIP";

export default () => {
  useEffect(() => {
    getIP();
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
