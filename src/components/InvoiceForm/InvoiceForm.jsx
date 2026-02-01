import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import "react-datepicker/dist/react-datepicker.css";
import InvoiceItemInput from "./InvoiceItemInput";
import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "../../utils/calculations";
import { loadFromLocalStorage } from "../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { getSingleInvoice } from "../../store/invoicesSlice";
const InvoiceForm = ({ onSubmit }) => {
  const { id } = useParams();
  const invoiceToEdit = useSelector((state) => state.invoices.selectedInvoice);
  const dispatch = useDispatch();
  const defaultValues = {
    invoiceNumber: "",
    clientName: "",
    issueDate: new Date(),
    dueDate: new Date(),
    items: [{ name: "", quantity: 1, unitPrice: 0 }],
    status: "Draft",
  };
  const [initialValues, setInitialValues] = useState(defaultValues);
  useEffect(() => {
    if (id) {
      dispatch(getSingleInvoice({ id }));
    }
  }, [id]);
  useEffect(() => {
    if (invoiceToEdit) {
      setInitialValues(invoiceToEdit);
    } else {
      setInitialValues(defaultValues);
    }
  }, [invoiceToEdit]);
  const TAX_RATE = useSelector((state) => state.invoices.TAX_RATE);
  let subtotal = 0.0;
  let tax = 0.0;
  let total = 0.0;

  // form validation schema
  const invoiceSchema = Yup.object().shape({
    invoiceNumber: Yup.string().required("Required"),
    clientName: Yup.string().required("Required"),
    issueDate: Yup.date().required("Required"),
    dueDate: Yup.date()
      .required("Required")
      .min(Yup.ref("issueDate"), "Due date must be after issue date"),
    items: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Required"),
          quantity: Yup.number().min(1, "Minimum 1").required("Required"),
          unitPrice: Yup.number().min(1, "Required").required("Required"),
        }),
      )
      .min(1, "At least one item is required"),
    status: Yup.string().oneOf(["Draft", "Sent", "Paid"]).required("Required"),
  });

  return (
    <div className="p-6">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={invoiceSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(
            { ...values, subtotal, tax, total, tax_rate: TAX_RATE },
            resetForm,
            id || null,
          );
        }}
      >
        {({ values, setFieldValue, resetForm }) => {
          subtotal = calculateSubtotal(values.items);
          tax = calculateTax(subtotal, TAX_RATE);
          total = calculateTotal(subtotal, tax);
          return (
            <Form className="space-y-4 ">
              <div className="flex flex-row flex-wrap gap-4">
                <InvoiceItemInput
                  inputName="invoiceNumber"
                  inputLabel="Invoice Number"
                />
                <InvoiceItemInput
                  inputName="clientName"
                  inputLabel="Client Name"
                />

                <div className="text-start">
                  <label className="block mb-1">Issue Date</label>
                  <DatePicker
                    name="issueDate"
                    selected={values?.issueDate}
                    onChange={(date) => setFieldValue("issueDate", date)}
                  />

                  <ErrorMessage
                    name="issueDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="text-start">
                  <label className="block mb-1">Due Date</label>
                  <DatePicker
                    name="dueDate"
                    selected={values?.dueDate}
                    onChange={(date) => setFieldValue("dueDate", date)}
                  />

                  <ErrorMessage
                    name="dueDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4"></div>

              {/* Items Table */}
              <FieldArray name="items">
                {({ push, remove }) => (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">Items</h3>
                      <button
                        type="button"
                        onClick={() =>
                          push({ name: "", quantity: 1, unitPrice: 0 })
                        }
                        className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                      >
                        + Add Item
                      </button>
                    </div>
                    <div className="w-full overflow-x-auto">
                      <table className="w-full min-w-[600px]  border">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border px-2 py-1">Name</th>
                            <th className="border px-2 py-1">Quantity</th>
                            <th className="border px-2 py-1">Unit Price</th>
                            <th className="border px-2 py-1">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {values?.items?.map((item, index) => (
                            <tr key={index}>
                              <td className="border px-2 py-1">
                                <Field
                                  name={`items[${index}].name`}
                                  className="w-full border rounded px-1 py-0.5"
                                />
                                <ErrorMessage
                                  name={`items[${index}].name`}
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </td>
                              <td className="border px-2 py-1">
                                <Field
                                  type="number"
                                  name={`items[${index}].quantity`}
                                  className="w-full border rounded px-1 py-0.5"
                                />
                                <ErrorMessage
                                  name={`items[${index}].quantity`}
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </td>
                              <td className="border px-2 py-1">
                                <Field
                                  type="number"
                                  name={`items[${index}].unitPrice`}
                                  className="w-full border rounded px-1 py-0.5"
                                />
                                <ErrorMessage
                                  name={`items[${index}].unitPrice`}
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </td>
                              <td className="border px-2 py-1 text-center">
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="px-2 py-2 bg-red-500 text-white rounded text-sm"
                                >
                                  <RiDeleteBinLine />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </FieldArray>

              {/* Calculated Fields */}
              <div className="space-y-4 text-start lg:w-[50%] md:w-[70%] xs:w-full ">
                <div className="font-medium bg-gray-100 p-2 rounded">
                  Subtotal: ${subtotal.toFixed(2)}
                </div>
                <div className="font-medium bg-gray-100 p-2 rounded">
                  Tax ({(TAX_RATE * 100).toFixed(2)}%): ${tax.toFixed(2)}
                </div>
                <div className="font-bold bg-gray-100 p-2 rounded">
                  Total: ${total.toFixed(2)}
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col justify-start gap-2 items-start  mt-6 xs:w-full md:w-[50%]">
                <label className="font-bold">Invoice Status</label>
                <Field
                  as="select"
                  name="status"
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Paid">Paid</option>
                </Field>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  //  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default InvoiceForm;
