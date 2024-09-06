import { configureStore } from '@reduxjs/toolkit';
import apijsondata from './slice/apijsondata';

export const store = configureStore({
    reducer:{
        apidata: apijsondata,
    },
});

export type RootState = ReturnType<typeof apijsondata>;

