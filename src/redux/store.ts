import {configureStore, combineReducers} from "@reduxjs/toolkit";

const rootReducer = combineReducers({});

const store = configureStore({
  devTools: true,
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
