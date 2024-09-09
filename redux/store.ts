import { configureStore } from '@reduxjs/toolkit';
//import apijsondata from './slice/apijsondata';
import apidataReducer from './slice/apijsondata';
import {persistStore , persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loggingMiddleware from './middlewares/logger';

const persistConfig = {
    key:'persist-key',
    storage:AsyncStorage,
};



const persistedReducer = persistReducer(persistConfig , apidataReducer);


export const store = configureStore({
    reducer:{
        apidata: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
          },
        }).concat(loggingMiddleware),
});

const persistor = persistStore(store);

export {persistor};

export type RootState = ReturnType<typeof store.getState>;

