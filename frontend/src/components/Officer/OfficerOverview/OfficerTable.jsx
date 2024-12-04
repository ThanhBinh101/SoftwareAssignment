import React, { useState } from 'react';
import StatusButton from "./StatusButton";

const OfficerTable = ({ title, tableCol, bgColor, titleColor, rowTextColor, colWidths }) => {
  const [printerStatuses, setPrinterStatuses] = useState([
    "On", "Off", "Using", "On", "Off", "Using", "Off"
  ]);

  const toggleStatus = (index) => {
    setPrinterStatuses((prevStatuses) => 
      prevStatuses.map((status, i) => {
        if (i === index) {
          if (status === "On") return "Off";
          if (status === "Off") return "On";
          return status;
        }
        return status;
      })
    );
  };

  return (
    <div>
      <div className="text-[32px] font-inter font-medium text-center mb-[20px]" style={{ color: titleColor }}>
        {title}
      </div>
      <div className={`bg-${bgColor} p-[40px] border-[2px] border-secondary rounded-[20px]`}>
        <table className="w-full border-collapse text-[16px]">
          <thead>
            <tr className="border-b-[2px] border-secondary" style={{ color: rowTextColor }}>
              {tableCol.map((item, index) => (
                <th 
                  className={`p-3 ${index + 1 === tableCol.length ? "" : "border-r-[2px] border-secondary"}`} 
                  key={item}
                  style={{ width: colWidths ? colWidths[index] : "auto" }}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {printerStatuses.map((status, index) => (
              <tr key={index} className="border-b-[2px] border-[#F7BCD6]" style={{ color: rowTextColor }}>
                <td className="p-3 border-r-[2px] border-secondary">1</td>
                <td className="p-3 border-r-[2px] border-secondary">1</td>
                <td className="p-3 border-r-[2px] border-secondary">1</td>
                <td className="p-3 border-r-[2px] border-secondary ">
                  <div className="ml-[20px]">
                    <StatusButton 
                      text={status} 
                      bgColor={status === "On" ? "#97D99D" : status === "Off" ? "#A68BC1" : "#FFEEE8"}
                      textColor={status === "Using" ? "#A68BC1" : "white"}
                    />
                  </div>
                </td>
                <td className="ml-[30px] flex items-center w-full">
                <button 
                  onClick={() => toggleStatus(index)}
                  className={`underline text-[20px] font-medium font-Ubuntu 
                    ${status === "Using" ? "text-[#F7BCD6]" : status === "On" ? "text-[#A68BC1]" : "text-[#97D99D]"}`}
                >
                  <span>{status === "Using" ? "View the queue" : status === "On" ? "Turn off printer" : "Turn on printer"}</span>
                </button>

                  <button className="ml-auto mr-[50px] p-3">
                    <img src="/Eye_fill.svg" alt="View" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={tableCol.length} className="p-[1px]"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfficerTable;
