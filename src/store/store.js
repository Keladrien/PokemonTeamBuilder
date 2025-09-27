import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./favSlice";
const store = configureStore({
  reducer: {
    team: teamReducer,
  },
});
export default store;
