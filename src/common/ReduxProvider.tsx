"use client";
import Header from "@/app/components/Header/Header";
import { CustomUser } from "@/hooks/useCustomUser";
import { store } from "@/redux";
import axios from "axios";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       
        {children}
      </PersistGate>
    </Provider>
  );
};
