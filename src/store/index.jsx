import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./Profile";
import issueReducer from "./Issue";
import modalReducer from "./Modal";

export const store = configureStore({
  reducer: {
    user: profileReducer,
    issues: issueReducer,
    modal: modalReducer,
  },
});
