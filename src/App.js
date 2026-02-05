import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import InvoicesList from "./pages/InvoicesList";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceDetailsPage from "./pages/InvoiceDetailsPage";
import EditeInvoice from "./pages/EditInvoice";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <div className="App">
          <div className="container">
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={<InvoicesList />}
                />
                <Route
                  path="/create-invoice"
                  element={<CreateInvoice />}
                />
                <Route
                  path="/invoice-details/:id"
                  element={<InvoiceDetailsPage />}
                />
                <Route
                  path="/edite-invoice/:id"
                  element={<EditeInvoice />}
                />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
