import { organizationApi } from "../api/organization";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { productApi } from "../api/product";

export const store = configureStore({
  reducer: {
    [organizationApi.reducerPath]: organizationApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      organizationApi.middleware,
      productApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
