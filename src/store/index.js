import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoicesSlice";

export const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
  },
});
