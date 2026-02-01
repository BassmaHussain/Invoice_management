import React from "react";

const StatusBadge = ({ status }) => {
  return (
    <div
      className={` rounded-md text-white font-medium py-[2px] px-4  ${
        status === "Paid"
          ? "bg-green-600"
          : status === "Draft"
            ? "bg-[#c90606]"
            : "bg-[#e75214]"
      }`}
    >
      {status}
    </div>
  );
};
export default StatusBadge;
