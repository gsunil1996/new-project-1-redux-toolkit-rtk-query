import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./api/usersApiSlice";
import counterReducder from "./features/counterSlice";
import todoReducer from "./features/todoSlice";
import { petsApiSlice } from "./api/petsApiSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducder,
    todo: todoReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [petsApiSlice.reducerPath]: petsApiSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      petsApiSlice.middleware,
      apiSlice.middleware
    ),
  devTools: true,
});
