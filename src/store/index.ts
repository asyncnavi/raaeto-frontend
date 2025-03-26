import { organizationApi } from "../api/organization";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { productApi } from "../api/product";
import { featureApi } from "../api/feature.tsx";
import { organizationSlice } from "./slices/organization.ts";

export const store = configureStore({
  reducer: {
    [organizationApi.reducerPath]: organizationApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [featureApi.reducerPath]: featureApi.reducer,
    organization: organizationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
          organizationApi.middleware,
          productApi.middleware,
          featureApi.middleware
      ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Fix `useAppDispatch` to use correct typing
export const useAppDispatch = () => useDispatch<AppDispatch>();
