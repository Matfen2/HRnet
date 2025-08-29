import { configureStore } from "@reduxjs/toolkit";
import newEmployeeReducer from "../features/newEmployee/newEmployeeSlice";

export const store = configureStore({
  reducer: {
    newEmployee: newEmployeeReducer,
  },
});