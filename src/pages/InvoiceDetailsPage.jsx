import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { FaArrowRightLong } from "react-icons/fa6";

import { Field } from "formik";
import { getSingleInvoice } from "../store/invoicesSlice";
import InvoiceDetails from "../components/InvoiceDetails/InvoiceDetails";
const InvoiceDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const selectedInvoice = useSelector(
    (state) => state.invoices.selectedInvoice,
  );
  useEffect(() => {
    if (id) {
      dispatch(getSingleInvoice({ id }));
    }
  }, [id]);
  return (
    <div className="flex flex-col gap-6 justify-start">
      <div className="flex justify-between border-b pb-3">
        <h2 className="text-2xl font-bold mb-0">Invoice Details</h2>

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
        <InvoiceDetails selectedInvoice={selectedInvoice} />
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;
