import React, { useEffect, useState } from "react";
import { editInvoice } from "../store/invoicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaArrowRightLong } from "react-icons/fa6";
import InvoiceForm from "../components/InvoiceForm/InvoiceForm";
const EditeInvoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const invoicesData = useSelector((state) => state.invoices.invoices);

  const handleSubmit = (values, resetForm, id) => {
    const existingInvoiceNumber = invoicesData.find(
      (invoice) =>
        invoice.invoiceNumber === values.invoiceNumber &&
        invoice.invoiceNumber !== id,
    );
    if (existingInvoiceNumber) {
      toast.error(
        "Invoice Number already exists. Please use a unique Invoice Number.",
        {
          position: "top-center",
          hideProgressBar: false,
          autoClose: 3000,
          progress: undefined,
          toastId: "",
        },
      );
      return;
    }

    dispatch(editInvoice({ updatedInvoice: values, id }));

    toast.success("Invoice updated successfully", {
      position: "top-center",
      hideProgressBar: false,
      autoClose: 3000,
      progress: undefined,
      toastId: "",
    });
    navigate("/");
  };
  return (
    <div className="flex flex-col gap-6 justify-start">
      <div className="flex justify-between border-b pb-3">
        <h2 className="text-2xl font-bold ">Update Invoice</h2>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          <FaArrowRightLong />
        </button>
      </div>
      <div>
        <InvoiceForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default EditeInvoice;
