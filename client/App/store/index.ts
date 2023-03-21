
import {configureStore, combineReducers, createStore} from "@reduxjs/toolkit";
import categoriesReducer from "./reducers/categoriesReducer";
import plantsReducer from "./reducers/plantsReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    persistStore,
    persistReducer,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from "redux-persist";
import rootReducer from "./reducers";


const persistConfig = {
    key: "root",
    version: 1,
    storage:AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [ REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
// const store = createStore(rootReducer);
const persistor = persistStore(store);
export { store, persistor };