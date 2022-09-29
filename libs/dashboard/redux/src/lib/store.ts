import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './root-reducer';

export const store = configureStore({ reducer: RootReducer });

export type RootStore = ReturnType<typeof RootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
