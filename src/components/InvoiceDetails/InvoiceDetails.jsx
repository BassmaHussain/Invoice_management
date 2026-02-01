import react from "react";
import { format } from "date-fns";
import StatusBadge from "./StatusBadge";
const InvoiceDetails = ({ selectedInvoice }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };
  return (
    <>
      {" "}
      <div>
        <ul className="grid md:grid-cols-2 xs:grid-cols-1 justify-start items-center">
          <li className="p-3 hover:bg-gray-50 flex flex-row gap-2">
            <p className="font-medium">Invoice number :</p>
            <p className="text-sm text-gray-500">
              {selectedInvoice?.invoiceNumber}
            </p>
          </li>

          <li className="p-3 hover:bg-gray-50 flex flex-row gap-2">
            <p className="font-medium">Client :</p>
            <p className="text-sm text-gray-500">
              {selectedInvoice?.clientName}
            </p>
          </li>

          <li className="p-3 hover:bg-gray-50 flex flex-row gap-2">
            <p className="font-medium">Issue Date :</p>
            <p className="text-sm text-gray-500">
              {formatDate(selectedInvoice?.issueDate)}
            </p>
          </li>

          <li className="p-3 hover:bg-gray-50 flex flex-row gap-2">
            <p className="font-medium">Due Date :</p>
            <p className="text-sm text-gray-500">
              {formatDate(selectedInvoice?.dueDate)}
            </p>
          </li>

          <li className="p-3 hover:bg-gray-50 flex flex-row gap-2">
            <p className="font-medium">Total amount :</p>
            <p className="text-sm text-gray-500">${selectedInvoice?.total}</p>
          </li>

          <li className="p-3 hover:bg-gray-50 flex flex-row gap-2">
            <p className="font-medium">Status :</p>
            <StatusBadge status={selectedInvoice?.status} />
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-start items-start mt-5">
        <h3 className="font-bold text-md mb-2">Items</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1 text-sm">Name</th>
              <th className="border px-2 py-1 text-sm">Quantity</th>
              <th className="border px-2 py-1 text-sm">Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedInvoice?.items?.map((item, index) => (
              <tr key={index}>
                <td className="border px-2 py-1 text-gray-600">{item?.name}</td>
                <td className="border px-2 py-1 text-gray-600">
                  {item?.quantity}
                </td>
                <td className="border px-2 py-1 text-gray-600">
                  ${item?.unitPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-4 text-start lg:w-[50%] md:w-[70%] xs:w-full mt-10 ">
        <div className="font-medium bg-gray-100 p-2 rounded">
          Subtotal: ${selectedInvoice?.subtotal.toFixed(2)}
        </div>
        <div className="font-medium bg-gray-100 p-2 rounded">
          Tax ({(selectedInvoice?.tax_rate * 100).toFixed(2)}%): $
          {selectedInvoice?.tax.toFixed(2)}
        </div>
        <div className="font-bold bg-gray-100 p-2 rounded">
          Total: ${selectedInvoice?.total.toFixed(2)}
        </div>
      </div>
    </>
  );
};
export default InvoiceDetails;
