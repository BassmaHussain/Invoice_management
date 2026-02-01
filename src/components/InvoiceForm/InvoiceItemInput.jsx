import { ErrorMessage, Field } from "formik";
import React from "react";

const InvoiceItemInput = ({ inputName, inputLabel }) => {
  return (
    <div className="text-start">
      {inputLabel && <label className="block mb-1">{inputLabel}</label>}
      <Field
        name={inputName}
        className="w-full border rounded px-1 py-0.5 "
        placeholder={inputLabel}
      />
      <ErrorMessage
        name={inputName}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

export default InvoiceItemInput;
