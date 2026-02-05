import { createSlice } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

const STORAGE_KEY = "invoices";

const initialState = {
  invoices: loadFromLocalStorage(STORAGE_KEY) || [],
  selectedInvoice: null,
  TAX_RATE: 0.14,
  userDummyData: {
    name: "amr faisal",
    email: "account@gmail.com",
    role: "super_admin",
  },
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    // selected invoice
    getSingleInvoice: (state, action) => {
      const { id } = action.payload;

      state.selectedInvoice =
        state?.invoices?.find((invoice) => invoice?.invoiceNumber === id) ||
        null;
    },
    clearSelectedInvoice: (state) => {
      state.selectedInvoice = null;
    },
    // add invoice
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
      saveToLocalStorage(STORAGE_KEY, state.invoices);
    },

    // get invoices
    setInvoices: (state, action) => {
      state.invoices = action.payload;
      saveToLocalStorage(STORAGE_KEY, state.invoices);
    },

    // edit invoice
    editInvoice: (state, action) => {
      const { id, updatedInvoice } = action.payload;
      const index = state.invoices.findIndex(
        (invoice) => invoice?.invoiceNumber === id,
      );

      if (index !== -1) {
        state.invoices[index] = {
          ...state.invoices[index],
          ...updatedInvoice,
        };
        saveToLocalStorage(STORAGE_KEY, state.invoices);
      }
    },

    // delete invoice
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.invoiceNumber !== action.payload,
      );
      saveToLocalStorage(STORAGE_KEY, state.invoices);
    },

    // update status
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.invoices.findIndex(
        (invoice) => invoice?.invoiceNumber === id,
      );

      if (index !== -1) {
        state.invoices[index].status = status;
        saveToLocalStorage(STORAGE_KEY, state.invoices);
      }
    },
  },
});

export const {
  addInvoice,
  editInvoice,
  deleteInvoice,
  setInvoices,
  getSingleInvoice,
  updateStatus,
  clearSelectedInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
