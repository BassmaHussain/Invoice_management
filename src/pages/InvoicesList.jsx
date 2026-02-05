import { Menu } from "@headlessui/react";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteInvoice, updateStatus } from "../store/invoicesSlice";
import InvoicesTable from "../components/InvoiceTable/InvoiceTable";
import { toast } from "react-toastify";
import { HiDotsVertical } from "react-icons/hi";
import { setPermissions } from "../config/permissions";
import usePermissions from "../CustomHooks/usePermissions";
const InvoicesList = () => {
  const navigate = useNavigate();
  const invoicesData = useSelector((state) => state.invoices.invoices);
  const { canEdit, canDelete, canChangeStatus, canCreate } = usePermissions();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dispatch = useDispatch();
  const handleDeleteClick = (index) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };
  const allowedStatuses = (currentStatus) => {
    if (!canChangeStatus) return [];
    if (currentStatus === "Draft") return ["Sent"];
    if (currentStatus === "Sent") return ["Paid"];
    return [];
  };
  const handleConfirmDelete = () => {
    dispatch(deleteInvoice(selectedIndex));
    setIsOpen(false);
    setSelectedIndex(null);
    toast.success("Invoice deleted successfully", {
      position: "top-center",
      hideProgressBar: false,
      autoClose: 3000,
      progress: undefined,
      toastId: "",
    });
  };
  const columns = useMemo(
    () => [
      { Header: "Invoice Number", accessor: "invoiceNumber" },
      { Header: "Client Name", accessor: "clientName" },
      // { Header: "Due Date", accessor: "dueDate" },
      // { Header: "Issue Date", accessor: "issueDate" },
      { Header: "Total amount", accessor: "total" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <Menu
            as="div"
            className="relative inline-block"
          >
            <Menu.Button
              className={`px-4 py-1 rounded   focus:outline-none focus-visible:outline-none focus-visible:ring-0 text-sm ${row?.original?.status === "Paid" ? "bg-gray-200" : "bg-gray-100"}`}
            >
              {row?.original?.status}
            </Menu.Button>
            {/* {row?.original?.status === "Paid" || !canChangeStatus ? null : ( */}
            <Menu.Items className="absolute z-50 mt-2 w-32 bg-white rounded shadow focus:outline-none focus-visible:outline-none focus-visible:ring-0 ">
              {allowedStatuses(row?.original?.status)?.map((status) => (
                <Menu.Item
                  key={status}
                  onClick={() => {
                    dispatch(
                      updateStatus({
                        id: row?.original?.invoiceNumber,
                        status,
                      }),
                    );
                  }}
                >
                  {({ active }) => (
                    <div
                      className={`px-3 py-2 text-sm ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      {status}
                    </div>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
            {/* )} */}
          </Menu>
        ),
      },
      {
        Header: "Settings",
        accessor: "",
        Cell: ({ row }) => (
          <div>
            <Menu
              as="div"
              className="relative inline-block text-left"
            >
              <Menu.Button className="p-2 rounded hover:bg-gray-100  focus:outline-none focus-visible:outline-none focus-visible:ring-0">
                <HiDotsVertical />
              </Menu.Button>

              <Menu.Items className="absolute right-0 z-50  mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none focus-visible:outline-none focus-visible:ring-0">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } flex flex-row items-center  gap-2 w-full px-4 py-2 text-sm text-left`}
                      onClick={() =>
                        navigate(
                          `/invoice-details/${row?.original?.invoiceNumber}`,
                        )
                      }
                    >
                      <FaRegEye /> View
                    </button>
                  )}
                </Menu.Item>

                {row?.original?.status !== "Paid" && canEdit && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } flex flex-row items-center  gap-2 w-full px-4 py-2 text-sm text-left`}
                        onClick={() =>
                          navigate(
                            `/edite-invoice/${row?.original?.invoiceNumber}`,
                          )
                        }
                      >
                        <FaPenToSquare /> Edit
                      </button>
                    )}
                  </Menu.Item>
                )}

                {canDelete && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100" : ""
                        } flex flex-row items-center  gap-2 w-full px-4 py-2 text-sm text-left`}
                        onClick={() =>
                          handleDeleteClick(row?.original?.invoiceNumber)
                        }
                      >
                        <RiDeleteBinLine /> Delete
                      </button>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Menu>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center md:flex-row flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#464646] ">Invoices List</h2>

        {canCreate && (
          <button
            onClick={() => navigate("/create-invoice")}
            className="px-4 py-2 bg-[#218707] text-white rounded hover:bg-[#218707e6] transition  flex flex-row items-center gap-2"
          >
            <FaPlus /> Create Invoice
          </button>
        )}
      </div>

      <div className="overflow-x-auto min-h-[400px] h-auto mt-10">
        {invoicesData?.length === 0 ? (
          <p className="text-center text-gray-500">No invoices available.</p>
        ) : (
          <InvoicesTable
            columns={columns}
            data={invoicesData}
          />
        )}
      </div>

      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete invoice"
        message="Are you sure you want to delete this invoice?"
      />
    </div>
  );
};

export default InvoicesList;
