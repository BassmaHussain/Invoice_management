import React from "react";

import { useTable } from "react-table";
const InvoicesTable = ({ columns, data }) => {
  const table = useTable({ columns, data });
  return (
    <div>
      {" "}
      <table className="min-w-full border border-gray-300 text-sm ">
        <thead className="bg-gray-100 text-center">
          {table.headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-2 border-b border-gray-300 text-center"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table?.rows?.map((row) => {
            table.prepareRow(row);
            return (
              <tr
                key={row.id}
                className="hover:bg-gray-50"
              >
                {row.cells.map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-b border-gray-200"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default InvoicesTable;
