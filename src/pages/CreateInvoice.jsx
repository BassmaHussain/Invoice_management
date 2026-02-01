import React, { useEffect, useState } from "react";
import InvoiceForm from "../components/InvoiceForm/InvoiceForm";
import { Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { addInvoice } from "../store/invoicesSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreateInvoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const invoicesData = useSelector((state) => state.invoices.invoices);

  const handleSubmit = (values, resetForm) => {
    // check for unique invoice number
    const existingInvoiceNumber = invoicesData.find(
      (invoice) => invoice.invoiceNumber === values.invoiceNumber,
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
    dispatch(addInvoice(values));
    resetForm();
    toast.success("Invoice added successfully", {
      position: "top-center",
      hideProgressBar: false,
      autoClose: 3000,
      progress: undefined,
      toastId: "",
    });
  };
  return (
    <div className="flex flex-col gap-6 justify-start">
      <div className="flex justify-between border-b pb-3">
        <h2 className="text-2xl font-bold mb-4">Create New Invoice</h2>
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

export default CreateInvoice;
