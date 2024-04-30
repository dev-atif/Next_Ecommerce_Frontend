import { configureStore } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const createNoopStorage = () => {
  return {
    getItem(_key:string) {
      return Promise.resolve(null);
    },
    setItem(_key:string, value:string) {
      return Promise.resolve(value);
    },
    removeItem(_key:string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");
// ...
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
// ....
import userReducer from "./userSlice";

const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
